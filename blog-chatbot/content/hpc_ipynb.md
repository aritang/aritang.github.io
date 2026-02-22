---
title: "HPC ipynb Short Code"
date: 2025-12-17T15:09:29-06:00
draft: false
---

I used to be a vim-and-python minimalist. But now I'm an economist so, here's how to run `.ipynb` on a server on a local computer.

Set up ssh key for login, so that you won't need to enter password a thousand times. See this blog [*configure SSH keys in terminal*](/posts/ssh/) or your own HPC documentation.

Booth's HPC use slurm. I use mac. The following will be based on these backgrounds.

### Step 1: Login, get a computing node

Login:

```bash
ssh username@mercury.chicagobooth.edu
```

Check resource availability

```bash
sinfo
```

This will show something like:

```bash
username@mfe01:/ $ sinfo
PARTITION       AVAIL  TIMELIMIT  NODES  STATE NODELIST
standard*          up 7-00:00:00      8 drain* mcn[01-08]
standard*          up 7-00:00:00      2  down* mcn[54,56]
standard*          up 7-00:00:00      1  drain mcn69
standard*          up 7-00:00:00     15    mix mcn[10-13,15,18-19,52-53,55,57,59-60,66,68]
standard*          up 7-00:00:00      5  alloc mcn[14,61,64-65,67]
long               up 14-00:00:0      5    mix mcn[10,16,59-60,63]
long               up 14-00:00:0      1  alloc mcn61
gpu_h100           up 2-00:00:00      2    mix mgpu[03-04]
interactive_gpu    up    2:00:00      2    mix mgpu[03-04]
highmem            up 4-00:00:00      1 drain* mcn09
highmem            up 4-00:00:00      1  drain mcn69
highmem            up 4-00:00:00     11    mix mcn[10-13,15-16,34,58,62,66,68]
highmem            up 4-00:00:00      5  alloc mcn[14,17,64-65,67]
```

Request resource. There is command to check if a certain combination of resource is available or not. I'm lazy, I just start at a high level, if it doesn't work, reduce it till I get a node.

```bash
srun \
  -p highmem \
  --account=phd \
  -t 4:00:00 \
  --cpus-per-task=1 \
  --mem=64G \
  --pty bash --login
```

Start a tmux session immediately to protext the session being automatically closed—then you can happily load python modules, activate environment and, **start a ipynb**:

```bash
tmux new -s work
module load python/booth/3.10
jupyter lab --no-browser --ip=127.0.0.1 --port=8888
```

Note: tmux detach `Ctrl-b d` and new pane `Ctrl-b "`.

## Step 1: Login, get a computing node

After running jupyter lab the terminal will vomit a lot pf lines. If it's on your own computer locally you just find the URL and paste it in Chrome and Jupyter Notebook start working. For HPC you need one more step to teleport that URL to our local:

```bash
ssh -N -L 8888:127.0.0.1:8888 -J username@mercury.chicagobooth.edu username@mcn58
```

Then open Chrome and the rest follows.

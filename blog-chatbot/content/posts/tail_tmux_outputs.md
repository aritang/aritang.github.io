---
title: "Monitor Tmux Output"
date: 2025-07-12T15:22:32+08:00
draft: false
---

Tmux is powerful for parallelization but can be **frustrating for monitoring experiments** at scales. Like, you can run multiple parallel projects in different sessions but it's hard to monitor each session — because you will have to manually 'attach' to a session to see outputs, and tmux has limited scrollback history and clunky scrolling interaction (you'll have to `Ctrl-v [` into copy mode to scroll). And once a tmux session dies — all terminal outputs are lost.

So the solution is, everytime a tmux session is created, flush all its terminal outputs to a file then later one can monitor the file:

For example, you created a tmux session:

```bash
session_identifier="name_placeholder"
tmux new-session -d -s "$session_identifier"
```

Then, attach a pipe to the session's output pane:

```bash
tmux pipe-pane -t "${session}:0.0" -o "cat >> ~/tmux_run.log"
```

The command basically means "Whatever the pane prints to **stdout or stderr**, send that through the shell command `cat >> ~/tmux_run.log`." The `-o` says: only open the pipe once the pane actually starts emitting output.

Then one can inject any more long-running command via send keys (remember to kill the session...) In this way, you won't need to be attached to tmux anymore, still you can monitor output live from anywhere (eg. often just another terminal) via

```bash
tail -f ~/tmux_run.log
```




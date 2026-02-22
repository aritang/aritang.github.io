---
title: "Running Parallel Jobs with Throttling Using tmux"
date: 2025-05-15T23:50:28+08:00
draft: false
---

If you need to run a bunch of jobs like `python main.py -config X`, and

- You have too many configs: `X = A, B, C`. Say you wanna run

    ```bash
    python f.py --config A.json
    python f.py --config B.json
    python f.py --config C.json
    ...
    ```

- You don’t want to overload your computer (if you dispatch all python run jobs all at once it will break)

- You don’t want to bother with job schedulers (like slurm)

- You're on macOS and `tmux send-keys` breaks on the second command to sent.

This came up when I was running experiment for my project. I just want to throw jobs at my computer but not set it on fire... Here’s a simple way to use `tmux` to queue jobs and limit how many run in parallel:

```bash
MAX_PARALLEL=4
CHECK_INTERVAL=1

config_dir="configs"

for config in "${config_dir}"/*.json; do

    # Wait until fewer than MAX_PARALLEL jobs are running
    while true; do
        running=$(tmux list-sessions -F '#S' 2>/dev/null | grep -c "^${prefix}")
        (( running < MAX_PARALLEL )) && break
        sleep "$CHECK_INTERVAL"
    done

    name=$(basename "$config" .json)
    session="job_${name}"

    tmux new-session -d -s "$session" "
        python f.py --config $config
        tmux kill-session -t $session
    "

    echo "queued: $session"
done
```


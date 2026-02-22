---
title: "from bash to python to find the space bug"
date: 2025-02-01T23:44:34+08:00
draft: false
---

I spent two days going nuts over a Python script not recognizing directories properly when passing them from a bash script. I was doing something like: (passing in a list of directories from command line to python)

```
python main.py --result_dir "folder/dir_1, folder/dir_2"
```

And in the python script `main.py`, parse the list of strings and on...

```python
result_dir_list = [f for f in result_dir.split(',')]
# some operations following
```

For now the code doesn't work.

It turns out that the extra space after the comma ("folder/dir_1, folder/dir_2") meant Python saw `" folder/dir_2"` with a leading space, which didn’t match the real folder name. Removing that extra space fixed everything:

```python
result_dir_list = [f.strip() for f in result_dir.split(',')]
```

Bash doesn't ignore spaces unless you explicitly handle them🤦🏻‍♀️

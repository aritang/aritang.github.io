---
title: ".json file | what is it and how to load them"
date: 2024-07-25T13:15:45-07:00
draft: false
---

A `.json` file is a text file formatted in JSON (JavaScript Object Notation). It is a lightweight data-interchange format, that is easy enough for human to read and write, but also easy for machine to parse and generate. JSON is frequently used to transmit data between a server and web applications, or using to store lightweight data.

In Python, one can load JSON file using `json` library:

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)
```

The loaded data `data` is then presented as a dictionary or a list.

Or, for more data manipulation function, using `pandas`:

```python
import pandas as pd

df = pd.read_json('data.json')
```


---
title: "how to use loggings in python to debug"
date: 2024-10-03T15:48:04+08:00
draft: false
---

A common way of debug during programming is to `print()` information at critical checkpoints in the program. But sometimes, you'll get tired of endless verbose console outputs... So here's a solution

## use `logging`

> Logging is a means of tracking events that happen when some software runs. The software’s developer adds logging calls to their code to indicate that certain **events** have occurred.
>
> ...Events also have an importance which the developer ascribes to the event; the importance can also be called the *level* or *severity*.

### print, but with levels:

```python
import logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s [%(levelname)s] %(message)s')
```

By configuring the level parameters, one is essentially setting a threshold of message to print:

| Configurations     | Numeric Value | String Value |
| ------------------ | ------------- | ------------ |
| `logging.DEBUG`    | `10`          | `DEBUG`      |
| `logging.INFO`     | `20`          | `INFO`       |
| `logging.WARNING`  | `30`          | `WARNING`    |
| `logging.ERROR`    | `40`          | `ERROR`      |
| `logging.CRITICAL` | `50`          | `CRITICAL`   |

### save loggings to file

```python
import logging
logging.basicConfig(filename='example.log',
                    encoding='utf-8',
                    level=logging.DEBUG, 
                    format='%(asctime)s [%(levelname)s] %(message)s',
                    filemode='a' # 'a' for append, 'w' for overwrite
                   )
```

### example usage:

```python
logging.debug('This message should go to the log file')
logging.info('So should this')
logging.warning('And this, too')
logging.error('And non-ASCII stuff, too, like Øresund and Malmö')
```

## advanced: customize logger:

One can instantiate a customized `Logger` calss by calling `logging.getLogger()` function and providing a name. A good practice is to pass `__name__` as the name parameter:

```python
import logging
logger = logging.getLogger(__name__)
logger.warning("Look at my logger!")
```

To configuring self-initiated logger, calling basicConfig won't work. Instead, handlers and formatters need to be used. 

This would be another story! Here's a helpful link for more detail: [Creating a Custom Logger](https://realpython.com/python-logging/#creating-a-custom-logger). 

Actually, I somehow suggest consulting an LLMs to do the job🤪.

## set threshold on command-line:

```bash
python logging_demo.py --log=INFO
```

### reference

[Logging HOWTO](https://docs.python.org/3/howto/logging.html#logging-howto) by Vinay Sajip.


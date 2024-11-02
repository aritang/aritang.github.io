---
title: "Organizing Simulation Experiment Results with Logging and Structured Storage"
date: 2024-11-02T22:49:05+08:00
draft: false
---

When conducting simulation experiments, maintaining an organized workflow is essential for ensuring reproducibility and facilitating debugging. As the experiments grow in complexity, managing outputs such as intermediate results, data files, and visualizations can become challenging. A streamlined approach involves using a **logger** to systematically store results and organizing all outputs in a structured directory based on random seeds and timestamps.

In this blog post, we'll explore setting up logging, managing directories, and storing results in an organized manner without delving into domain-specific simulation logic.

### Key Objectives

1. **Printing Intermediate Results**: Verify the correctness of your program by logging intermediate results during execution.
2. **Exporting Results**: Save results in text files (`.npy`, `.json`) and generate visualizations for analysis.
3. **Organizing Outputs**: Use a logger and structured directory naming (based on seed and timestamp) to keep everything organized.

## Code: Structured Logging and Storage for Simulation Experiments

Below is a streamlined example that demonstrates how to set up logging, manage directories, and store simulation results in an organized manner.

```python
import numpy as np
import matplotlib.pyplot as plt
import logging
import datetime
import os
import json
import hashlib

def get_deterministic_seed(seed_str):
    """
    Generate a deterministic seed from a string using MD5 hashing.
    """
    return int(hashlib.md5(seed_str.encode('utf-8')).hexdigest(), 16) & 0xffffffff

def setup_logger(results_dir):
    """
    Set up a logger to capture and store console outputs into a text file within the results directory.
    """
    logger = logging.getLogger('simulation_logger')
    logger.setLevel(logging.INFO)
    
    # Create a file handler
    log_file = os.path.join(results_dir, "console_outputs.txt")
    fh = logging.FileHandler(log_file)
    fh.setLevel(logging.INFO)
    
    # Create a formatter and set it for the handler
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s', 
                                  datefmt='%Y-%m-%d %H:%M:%S')
    fh.setFormatter(formatter)
    
    # Add the handler to the logger
    logger.addHandler(fh)
    
    return logger

def run_simulation(seed_str, param1, param2, results_dir, logger):
    """
    A placeholder simulation function that performs computations, logs intermediate results,
    and saves outputs.
    """
    # Set random seed for reproducibility
    seed = get_deterministic_seed(seed_str)
    np.random.seed(seed)
    logger.info(f"Deterministic Seed: {seed}")
    
    # Perform some computations
    data = np.random.randn(100) * param1 + param2
    logger.info(f"Generated data with param1={param1} and param2={param2}")
    
    # Save intermediate data as .npy file
    data_file = os.path.join(results_dir, "data.npy")
    np.save(data_file, data)
    logger.info(f"Saved data to {data_file}")
    
    # Save parameters to a .json file
    params = {
        'seed_str': seed_str,
        'param1': param1,
        'param2': param2,
        'timestamp': datetime.datetime.now().isoformat()
    }
    
    params_file = os.path.join(results_dir, "params.json")
    with open(params_file, 'w') as f:
        json.dump(params, f, indent=4)
        
    logger.info(f"Saved parameters to {params_file}")
    
    # Generate and save a plot
    plt.figure(figsize=(8, 6))
    plt.hist(data, bins=30, alpha=0.7, color='blue')
    plt.title('Histogram of Simulated Data')
    plt.xlabel('Value')
    plt.ylabel('Frequency')
    plot_file = os.path.join(results_dir, "data_histogram.png")
    plt.savefig(plot_file)
    plt.close()
    logger.info(f"Saved histogram plot to {plot_file}")
    
    # Return results as a dictionary
    results = {
        'data_mean': np.mean(data),
        'data_std': np.std(data),
        'params': params
    }
    return results

def main():
    # Define seed and timestamp
    SEED_STR = "Paganini"
    STR_TIME = datetime.datetime.now().strftime('%d-%m-%Y_%H-%M-%S')
    
    # Create a results directory based on seed and timestamp
    RESULTS_DIR = f"results/{SEED_STR}_{STR_TIME}"
    os.makedirs(RESULTS_DIR, exist_ok=True)
    
    # Set up the logger
    logger = setup_logger(RESULTS_DIR)
    logger.info("Simulation started.")
    
    # Define simulation parameters
    simulation_params = {
        'param1': 2.5,
        'param2': 0.5
    }
    logger.info(f"Simulation parameters: {simulation_params}")
    
    # Run the simulation
    results = run_simulation(
        seed_str=SEED_STR,
        param1=simulation_params['param1'],
        param2=simulation_params['param2'],
        results_dir=RESULTS_DIR,
        logger=logger
    )
    
    # Log final results
    logger.info(f"Simulation completed with results: {results}")
    logger.info("All outputs have been saved successfully.")

if __name__ == "__main__":
    main()
```

## Key Components and Functions

### Deterministic Seed Generation

```python
def get_deterministic_seed(seed_str):
    return int(hashlib.md5(seed_str.encode('utf-8')).hexdigest(), 16) & 0xffffffff
```

Converts a string seed (`seed_str`) into a deterministic integer seed using MD5 hashing. This ensures reproducibility by generating the same seed from the same input string.

### Logger Setup

```python
def setup_logger(results_dir):
    logger = logging.getLogger('simulation_logger')
    logger.setLevel(logging.INFO)
    
    # Create a file handler
    log_file = os.path.join(results_dir, "console_outputs.txt")
    fh = logging.FileHandler(log_file)
    fh.setLevel(logging.INFO)
    
    # Create a formatter and set it for the handler
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s', 
                                  datefmt='%Y-%m-%d %H:%M:%S')
    fh.setFormatter(formatter)
    
    # Add the handler to the logger
    logger.addHandler(fh)
    
    return logger
```

**Purpose**: Configures a logger to capture and store console outputs into a text file within the `results_dir`. This ensures that all logs are timestamped and saved for future reference.

### Main Execution Block

```python
def main():
    # Define seed and timestamp
    SEED_STR = "Paganini"
    STR_TIME = datetime.datetime.now().strftime('%d-%m-%Y_%H-%M-%S')
    
    # Create a results directory based on seed and timestamp
    RESULTS_DIR = f"results/{SEED_STR}_{STR_TIME}"
    os.makedirs(RESULTS_DIR, exist_ok=True)
    
    # Set up the logger
    logger = setup_logger(RESULTS_DIR)
    logger.info("Simulation started.")
    
    # Define simulation parameters
    simulation_params = {
        'param1': 2.5,
        'param2': 0.5
    }
    logger.info(f"Simulation parameters: {simulation_params}")
    
    # Run the simulation
    results = run_simulation(
        seed_str=SEED_STR,
        param1=simulation_params['param1'],
        param2=simulation_params['param2'],
        results_dir=RESULTS_DIR,
        logger=logger
    )
    
    # Log final results
    logger.info(f"Simulation completed with results: {results}")
    logger.info("All outputs have been saved successfully.")
```

1. **Seed and Timestamp**: Defines a seed string and generates a timestamp to uniquely identify the simulation run.
2. **Directory Creation**: Creates a results directory named based on the seed and timestamp to store all outputs.

## Conclusion

Effectively managing simulation experiments is crucial for deriving meaningful insights and ensuring the reliability of your results. This approach improves organization and reproducibility by systematically structuring results with seeds and timestamps, ensures thorough logging for debugging, allows easy scalability for more complex experiments, and enhances transparency by saving outputs in clear, structured formats.

Feel free to adapt and expand upon this template to suit the specific needs of your projects!

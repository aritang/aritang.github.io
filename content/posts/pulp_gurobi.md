---
title: "PuLP with Gurobi on the side"
date: 2024-08-26T12:23:16+08:00
draft: false
---

Using `Gurobi` and `PuLP` for LP:

```python
import pulp
```

- Retrieves a solver interface for Gurobi using PuLP. It allows one to use Gurobi as the solver when defining optimization problems in PuLP:

    ```python
    solver = pulp.getSolver('GUROBI')
    ```

- Silence `pulp` solving console output:
    ```python
    pulp.LpSolverDefault.msg = 0
    ```
    
- Setup the model with variables, objectives and constraints

    ```python
    # Initialize the LP model
    K = 3
    B = 4
    model = pulp.LpProblem("model_name", pulp.LpMaximize)
    z = pulp.LpVariable.dicts("z", range(K), lowBound=0)
    
    # Objective function
    model += pulp.lpSum(z), "Objective"        
    
    # Constraints
    model += pulp.lpSum([z[k] for k in range(K)]) <= B, "Budget_Constraint"
    ```

- Solve the problem and check status

    ```python
    model.solve()
    print(pulp.LpStatus[self.model.status] == pulp.LpStatus[1])
    ```

- Variable results:

    ```python
    for k in range(K):
        print(f"z = {pulp.value(z[k])}")
    ```

- Constraint slackness:

    ```python
    if model.constraints["Budget_Constraint"].pi != 0:
        print("The budget constraint is tight.")
    else:
        print("The budget constraint is not tight.")
    ```

Put together:

```python
import pulp
pulp.LpSolverDefault.msg = 0

K = 3
B = 4

# Initialization
model = pulp.LpProblem("model_name", pulp.LpMaximize)
z = pulp.LpVariable.dicts("z", range(K), lowBound=0)

# Objective function
model += pulp.lpSum(z[k] for k in range(K)), "Objective"

# Constraints
budget_constraint = pulp.lpSum(z[k] for k in range(K)) <= B
model += budget_constraint, "Budget_Constraint"

# Solve the model
model.solve()

# Check if the model is solved optimally
if pulp.LpStatus[model.status] == 'Optimal':
    print("Model solved optimally.")
else:
    print("Model not solved optimally.")

# Print variable values
for k in range(K):
    print(f"z[{k}] = {pulp.value(z[k])}")

# Accessing and printing the dual value of the budget constraint
print("Dual value (shadow price) of the budget constraint:", model.constraints["Budget_Constraint"].pi)
```


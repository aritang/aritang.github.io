---
title: "understanding reinforcement learning through dynamic programming | a model-free approach"
date: 2024-05-22T18:51:52+08:00
draft: false
---

**Dynamic Programming (DP)** serves as a foundational approach in computational algorithms, especially effective in environments with complete knowledge of state transitions and rewards, described within the **Markov Decision Process (MDP)** framework. However, the real-world often presents scenarios where such comprehensive information is unavailable. Here, **Reinforcement Learning (RL)** steps in with model-free methods that leverage DP principles but operate without the need for explicit transition probabilities or rewards.

## Markov Decision Process (MDP) Framework
An MDP is a mathematical framework used to describe an environment in decision-making problems where outcomes are partly random and partly under the control of a decision-maker. MDPs are defined by the following components:

- **States $ S $**: A finite set of states that the system can be in.

- **Actions $ A $**: For each state $ s $, there exists a finite set of actions $ A(s) $ available to the decision-maker.

- **Transition Probability $ P(s', s \mid a) $**: The probability of moving from state $ s $ to state $ s' $ after taking action $ a $.

- **Reward Function $ R(s, a, s') $**: The immediate reward received after transitioning from state $ s $ to state $ s' $, due to action $ a $.

- **Discount Factor $ \gamma $​**: A factor between 0 and 1 that discounts future rewards, reflecting the preference for immediate rewards over future ones.

- **Objective**: The decision-maker's objective is to find a policy $\pi$ that is essentially a mapping from state to action, and maximizes the **expected cumulative reward** over time:
    $$
    \max_\pi \mathbb E [\sum_{t = 0}^\infty \gamma^tR(s, \pi(s))]
    $$

### Linking MDPs to Reinforcement Learning
In traditional DP, solving an MDP involves calculating the optimal policy to maximizes cumulative rewards, **using complete knowledge of $ P $ and $ R $.** Reinforcement Learning, particularly the model-free approach, simplifies this by not requiring explicit knowledge of these functions, thus enabling learning and decision-making directly from interactions with the environment.

Model-free RL methods, such as Monte Carlo and Temporal Difference learning, approximate the key functions of MDPs (value functions and policies) through experiences, adjusting their estimates towards optimal values as more data is gathered from the environment. This adaptability makes RL suited for complex and dynamic environments where traditional DP might be impractical.

## Monte Carlo Methods

Monte Carlo methods are essential in the toolkit of model-free reinforcement learning, particularly valued for their simplicity and efficacy in episodic tasks, where each episode is a sequence of states, actions, and rewards that eventually reaches a terminal state.

### Prediction and Control in Monte Carlo Methods
Monte Carlo methods are divided into two primary tasks: **prediction** and **control**, each serving a unique purpose in learning and policy optimization.

- **Prediction:** The objective here is to estimate the value function $V_\pi(s)$ for a given policy $\pi$. $V_\pi(s)$ represents the expected return (cumulative discounted rewards) when starting from state $s$ and following policy $\pi$ thereafter. Monte Carlo prediction calculates this by averaging the returns observed after many episodes, specifically focusing on returns starting from state $s$​. The update formula for the value function in Monte Carlo prediction is:
  $$
  V(S_t) \leftarrow \frac{1}{N(S_t)} \sum_{i=1}^{N(S_t)} G_i
  $$
  

  where $N(S_t)$ is the number of times state $S_t$ has been visited, and $G_i$ are the returns observed in these visits.

- **Control:** While prediction is about evaluating a policy, control is about improving it. The goal in the control setting is to find the optimal policy that maximizes the expected return from any given state. This is typically done using the action-value function $Q(s, a)$, which estimates the expected return after taking an action $a$ in state $s$ and thereafter following policy $\pi$. The challenge in Monte Carlo control is ensuring that all actions are sufficiently explored, which is addressed by techniques like $\epsilon$-soft policies. The update formula for the action-value function in Monte Carlo control is:
  $$
  Q(S_t, A_t) \leftarrow \frac{1}{N(S_t, A_t)} \sum_{i=1}^{N(S_t, A_t)} G_i
  $$
  where $N(S_t, A_t)$ is the number of times the action $A_t$ has been taken in state $S_t$, and $G_i$ are the returns following these actions.
  
  ### On-Policy vs. Off-Policy Learning
  
  Control methods can be implemented in two forms: on-policy and off-policy, each with its approach to exploring and learning:
  
  - **On-Policy Learning:** In this approach, the learning policy $\pi$ is also the policy used to generate behavior. This means that the value function or action-value function directly reflects the outcomes of decisions made by the policy itself. An example of on-policy learning in Monte Carlo methods is when using an $\epsilon$-soft policy, where the policy remains slightly random to ensure all states are explored.
  
  
  - **Off-Policy Learning:** Contrary to on-policy, off-policy methods use a different policy for generating behavior than the one being evaluated and improved. This is useful for learning from exploratory data or an existing dataset of behavior generated by a different policy. In Monte Carlo methods, this often involves using an $\epsilon$​-greedy policy for exploration while updating the estimates towards the greedy policy's values. **The importance sampling ratio is crucial here to adjust the estimates to reflect the policy's probability distribution.**
  

### summary for MC

Monte Carlo methods provide a straightforward yet powerful approach to solving reinforcement learning problems, particularly in environments with clear episode boundaries. By directly estimating value functions from complete episodes, these methods offer a blend of simplicity and directness in tackling both prediction and control challenges in model-free settings.

## Temporal Difference (TD) Learning

Temporal Difference (TD) learning stands out as a pivotal method in reinforcement learning due to its ability to learn directly from raw experience without a model of the environment's dynamics. Unlike Monte Carlo methods, which wait until the end of an episode to update value estimates, TD learning updates estimates incrementally after each step.

### prediction and control in TD learning
TD learning can be used for both prediction and control tasks in reinforcement learning:

- **Prediction:** The goal is to estimate the value function $ V(s) $ for a given policy. TD learning updates the value function after each time step, using the observed reward and the estimated value of the subsequent state. This update, known as bootstrapping, combines observed rewards with existing value estimates:
  $$
  V(S_t) \leftarrow V(S_t) + \alpha\left[\text{TD target} - V(S_t)\right]
  $$
  where the TD target is typically $ R_{t + 1} + \gamma V(S_{t + 1}) $, combining the reward received after taking action $ A_t $ and the discounted estimate of the next state's value.

- **Control:** The objective in the control setting is to find an optimal policy. This involves learning the optimal action-value function $ Q(s, a) $, which estimates the expected return after taking action $ a $ in state $ s $ and thereafter following an optimal policy. TD methods for control include on-policy approaches like SARSA and off-policy methods such as Q-learning.

    ### SARSA vs. Q-learning

    TD methods can be implemented as either on-policy or off-policy, each with distinct characteristics:

    - **On-Policy (SARSA):** SARSA, which stands for State-Action-Reward-State-Action, updates the action-value function based on the action actually taken, as determined by the current policy (typically $\epsilon$-greedy):
      $$
      Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha\left[ R_{t + 1} + \gamma Q(S_{t + 1}, A_{t + 1}) - Q(S_t, A_t)\right]
      $$
      This approach directly incorporates the decision-making process into the learning algorithm, maintaining a close adherence to the policy's behavior.


    - **Off-Policy (Q-learning):** Q-learning seeks to find the optimal policy directly, regardless of the agent's actions. It updates the action-value function using the maximum value of the next state, regardless of the action taken by the policy:
      $$
      Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha\left[ R_{t + 1} + \gamma \max_{a'} Q(S_{t + 1}, a') - Q(S_t, A_t)\right]
      $$
      Q-learning typically converges faster than SARSA as it always assumes optimal future actions, making it a robust choice for environments where a precise model of the environment is unknown.
    
    #### some variants of TD learning address specific challenges or scenarios:
    
    - **Expected SARSA:** Averages over possible next actions rather than relying on a single sample, reducing variance and potentially improving learning stability––computationally costly but converges faster.
    
    - **Double Q-learning:** Uses two separate value estimates to decouple the action selection from the target value calculation, addressing the overestimation bias common in standard Q-learning.


### summary of TD

Temporal Difference (TD) learning is crucial for enabling learning from incomplete sequences of experience, without waiting for the end of an episode. Among its variants, **Q-learning** is particularly noteworthy. It updates its estimates using the best available actions, thereby directly targeting the optimal policy, regardless of the agent's actions during exploration. This method not only accelerates convergence but also reduces dependency on specific policies during data generation, enhancing its application in dynamic and complex environments. 

Q-learning exemplifies the efficiency and effectiveness of TD learning, making it a key strategy in AI and autonomous system development.

## $n$-step SARSA: bridging MC and TD learning

The core idea behind n-Step SARSA is to update the value estimates based on **$n$ steps** of experience rather than relying on a single step (as in standard TD learning) or waiting until the end of an episode (as in MC methods). This approach allows the algorithm to incorporate more comprehensive trajectory information into each update, improving the quality of the policy evaluation and development without the full delay of episode completion required by pure MC methods.

### algorithm key detail
The update function for n-Step SARSA is a natural extension of the single-step SARSA, incorporating rewards and state transitions over $n$ steps:
$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha\left[ R_{t+1} + \gamma R_{t+2} + \dots +  \gamma^n Q(S_{t+n}, A_{t+n}) - Q(S_t, A_t)\right]
$$
This formula uses the real (environment feedback) reward over first $n$ steps, while afterwards just adding up using the (discounted) estimate $Q$. This n-step perspective helps in smoothing out the learning updates, providing a balance between immediate and delayed rewards, and typically leads to more stable learning convergence.

---
title: "Diabetes Risk Prediction Using Neural Networks"
description: "Built a neural network model to predict diabetes risk, analysing performance under class imbalance using TensorFlow and Keras."
# date: 2026-02-01
# cover: "/images/diabetes.png"
order: 4
github: "https://github.com/hamzamooraj99/ANN-CDC-Diabetes-Case-Study-IMB/tree/main"
---

# Diabetes Risk Prediction Using Neural Networks
### Overview
Developed an end-to-end Artificial Neural Network (ANN) pipeline to predict diabetes risk using the CDC BRFSS 2015 dataset. The project focused on model training under class imbalance and evaluation of predictive robustness.

---

### Problem
Medical datasets often exhibit significant class imbalance, leading to biased models that over-predict majority classes.

The goal was to build and evaluate a neural network while explicitly analysing the impact of imbalance on training dynamics and predictive performance.

---

### Approach

* Data preprocessing and feature normalization
* ANN implemented using TensorFlow and Keras
* Binary classification setup
* Model training and validation using imbalanced dataset
* Performance evaluation across precision, recall, and F1 metrics
* Analysis of decision threshold effects on minority-class recall

---

## Dataset

The Behavioral Risk Factor Surveillance System (BRFSS) is a health-related telephone survey that is collected annually by the CDC. This original dataset contains responses from 441,455 individuals and has 330 features.\
\
The dataset used in this Case Study is a dataset of 253,680 survey responses to the CDC's BRFSS2015 with 21 feature variables. The target variable Diabetes_012 has 3 classes:

* 0 is for no diabetes or only during pregnancy
* 1 is for prediabetes
* 2 is for diabetes.

There is class imbalance in this dataset.\
\
The dataset was retrieved from: <https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset>

***

### Engineering Highlights

* Built full pipeline in Jupyter Notebook

* Explored imbalance effects on gradient updates and convergence

* Compared training behavior across multiple hyperparameter settings

* Documented trade-offs between recall and false positives

***

### Technologies

TensorFlow, Keras, Python, Jupyter Notebook

***

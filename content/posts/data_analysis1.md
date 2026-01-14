---
title: "understanding (a bit of) ML through HD-statistics"
date: 2024-02-01T21:44:44+08:00
draft: false

---

There's a meme that perfectly captures the essence of understanding machine learning, a realization that dawned on me after enrolling in both machine learning and statistics courses. It highlights the intricate relationship between these fields in a humorous yet profound way:

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/data_vis/stats_ML_meme.jpeg" caption="It wasn't until taking both machine learning and stats courses to make me recall how accurate this meme is.">}}

**High Dimensional Statistics** was an elective course I took last semester (Fall/Winter 2023-24) at SUFE, taught by Prof. Hongsong Yuan. The course's popularity was such that securing a spot required a bit of tricks (aka brute-force python http requests to hack the website to get a slot)👩🏻‍💻 .

And it is where I learned to do regression. The course provided a hands-on introduction to regression, data analysis, and the practical application of basic statistics—a stark contrast to the theoretical focus of the required Mathematical Statistics course, where we delved into proofs without applying them to real-world data. This elective offered a gateway into the tangible world of data manipulation, starting with the textbook *Applied Linear Regression* by Sanford Weisberg. Regression analysis involves correlating one variable with others based on existing data, which depends on certain **assumptions** about the problem at hand. Our primary tasks included estimating model parameters, testing model fit, and making predictions.

The question start with why on earth LINEAR regressions, given the plethora of modern data analysis tools available, such as SVMs and neural networks? The answer lies in the foundational role linear methods play in the development of these advanced tools. Linear methods offer ease of testing, fitting, and interpretation—a crucial aspect for transparency. Moreover, they provide reliable solutions for numerous statistical challenges, emphasizing the quantitative, statistical perspective in empirical research— at least it's a vital component for publication success to get your p value down.

The mathematical requirements of the course were not crazy, encompassing basic linear algebra, probability theory, and a touch of optimization. On the coding front, `R` was introduced and recommended for its specialized packages, which prove highly convenient for specific analyses. However, my preference leans towards `Python` for its versatility and comprehensive functionality, including integration with various APIs and tasks—capabilities not as readily available in `R`.

The latter half of the course ventured into more exciting, albeit sometimes perceived as less practical, topics such as high-dimensional methods for classification and dimension reduction. These areas, surprisingly close to machine learning principles, included an in-depth look at logistic regression and network analysis for community identification in graphs.

Throughout the course we looked into a lot of real-world empirical data sets, ranging from professor ratings to football player statistics, provided a practical lens through which to view and analyze information—despite their unnaturally clean and organized presentation. The final project, centered around COVID data analysis, underscored the difference between theoretical understanding and the practical application of these methods.

In summary, the course was a comprehensive exploration of regression analysis theory, high-dimensional methods, and hands-on data analysis experience, culminating in the intense, deadline-driven completion of the final project.

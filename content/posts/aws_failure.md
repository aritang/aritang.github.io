---
title: "Canvas down due to AWE DNS resolution failure"
date: 2025-10-20T11:50:37-05:00
draft: false
summary: "A pause on my econometric homework, here's what seems to have happened:"
---

Canvas is down!

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/google_ad_gossip/canvas_down.jpeg" caption="Nooooooooooo. But will we get extensions?" width="66%">}}

Now that I am unable to continue on my econometric homework, here's what seems to have happened:

> TL;DR: A failure in AWS’s internal system that monitors and routes traffic through its network load balancers in the **us-east-1** region disrupted **DNS resolution** for the DynamoDB API endpoint, causing many services (like Canvas) to lose the ability to reach their database servers even though the databases themselves were still running.

Canvas uses Amazon Web Services (AWS)'s DynamoDB database service. The way it (failed to) works:

1. Applications (like Canvas, the client) sent data **requests** to AWS’s database service (eg. DynamoDB) through its public network name (hostname)
   → `dynamodb.us-east-1.amazonaws.com`.
2. Each request must first find the actual computer address (**IP**) for that hostname using the Domain Name System (DNS) (it's almost like the global "yellow page" of the internet).
3. The DNS returns the IP that "redirect" (resolve) the request to AWS’s **load balancer**, which is a traffic manager that decides which internal server should handle the request.
4. Inside AWS’s **us-east-1** data region, the system that monitors whether these load balancers are healthy **malfunctioned**. Because load balancers were marked as unhealthy, their addresses were withdrawn from the DNS results or became unreachable.
5. Now, when apps looked up `dynamodb.us-east-1.amazonaws.com`, they got no valid IP or a dead IP. Since thousands of AWS services rely on the same routing layer, and DNS is the first step, many systems couldn’t connect. 

And therefore, I don't need to do metric homework today!

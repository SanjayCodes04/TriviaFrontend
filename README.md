
# Cloud-Native Full Stack Web Application using AWS Services

This project is a scalable and cloud-native full-stack web application built using React (frontend), Node.js (backend), and Amazon DocumentDB (database). It leverages various AWS services for hosting, containerization, and CI/CD to ensure high availability and performance.

---

## Features

- **Frontend** built with React and hosted on **AWS S3**.
- **CDN delivery** via **CloudFront** for optimized performance.
- **Backend** built with Node.js and containerized using **Docker**.
- **Database** powered by **Amazon DocumentDB** for scalable NoSQL storage.
- **CI/CD pipelines** implemented via **CodeBuild** for automated deployments.
- **Backend deployed** on **AWS App Runner** using images from **ECR**.
- **Fully managed DevOps pipeline** ensuring continuous delivery and scalability.

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** Amazon DocumentDB
- **Containerization:** Docker
- **Cloud Services:** 
  - AWS S3 (Frontend hosting)
  - AWS CloudFront (CDN)
  - AWS CodeBuild (CI/CD)
  - AWS App Runner (Backend deployment)
  - AWS ECR (Container registry)

---

## Architecture Diagram

```
[ React (Frontend) ] → [ S3 + CloudFront ]
                             ↓
               [ CodeBuild + Docker + ECR ]
                             ↓
                  [ App Runner (Node.js) ]
                             ↓
                   [ Amazon DocumentDB ]
```

---

## Contact

For queries or collaboration, feel free to reach out at [sanjaysadasivam1227@example.com](mailto:sanjaysadasivam1227@gmail.com@example.com)

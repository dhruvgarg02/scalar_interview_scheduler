## Steps to Run the Application
### Step 1:
Create Database "scalar" with following tables.

![image](https://user-images.githubusercontent.com/55585464/158637575-8e7d379a-9bac-4df2-ba3c-e29b4561e8ca.png)

![image](https://user-images.githubusercontent.com/55585464/158637837-c85bd0c8-3329-473a-a9e2-dd76e5e3ee96.png)

![image](https://user-images.githubusercontent.com/55585464/158637919-9d31b1e4-6e82-4979-ba13-31e10d75615d.png)

### Step 2:
Create a environment variable "DATABASE_URL"

```DATABASE_URL = "postgresql://<user>:<password>@localhost:5432/<DbName>"```

### Step 3:
Install node modules by running
  
```npm i```
  
### Step 4:
Start Server by running
  
```nodemon .\server```
  
### Step 5:
Start React App by running
  
```npm start```

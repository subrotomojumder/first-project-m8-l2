# University Operating Server App

### Live Server Link : [https://ph-university-management-system.vercel.app/](https://github.com/subrotomojumder/university-oprerating-server-phl2)

### Needed for Run locally

- First of all clone my github repo. then install all the package.
- Install all the package. Go to terminal and than command.

```bash
npm i
```

- Create an .env file in root and set variable values.

```bash
PORT= port
DATABASE_URL= database-uri
NODE_ENV= development-or-production
BCRYPT_SALT_ROUNDS= number
JWT_ACCESS_SECRET= secret-key
JWT_ACCESS_EXPIRE_IN= 10m | 2d | 30d
Others.....
```

- After run npm run dev to start the server.

```bash
npm run dev
```

### Login credentials:

#### Super Admin Login:

      User ID  : 0001
      Password : admin1234

#### Faculty Login:

        User ID  : F-0005
        Password : faculty123

#### Student Login:

        User ID  : 2027030002
        Password : student1234


### instructions :

If you want to create or update documents , The body must be of **json** type data.

### Api endpoint Explanations documentation : [https://documenter.getpostman.com/view/24264048/2sA3duGDQy](https://documenter.getpostman.com/view/24264048/2sA3duGDQy)
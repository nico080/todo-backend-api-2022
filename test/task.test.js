const supertest = require("supertest");
const app = require("../src/app");

const todo = { "task": "Unit Test Running" }

let token;

const getToken = async () => {
  const user = { uname: "user123", password: "asd" };

  // Login user and get access token
  const loginResponse = await supertest(app).post(`/api/auth/`).send(user);
  return loginResponse.body.token;
};



describe("Create TODO", () => {
  let taskId;
  beforeAll(async () => {
    token = await getToken();
  });
  afterAll(async () => {
      await supertest(app)
          .delete(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${token}`)
  })

  it("Should create a new TODO Task", async () => {
    const res = await supertest(app)
      .post(`/api/tasks`)
      .send(todo)
      .set("Authorization", `Bearer ${token}`);
    taskId = res.body.data.task._id
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe('Get All Tasks or Get Task By Id', () => {
    let taskId
    beforeAll(async () => {
        token = await getToken()
        const res = await supertest(app)
      .post(`/api/tasks`)
      .send(todo)
      .set("Authorization", `Bearer ${token}`);

      taskId = res.body.data._id
    })

    afterAll(async () => {
         await supertest(app)
          .delete(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${token}`)
    })

    it('Get Task By Id', async () => {
        const res = await supertest(app)
            .get(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })

    it('Get All Tasks', async () => {
        const res = await supertest(app)
            .get(`/api/tasks`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('totalNum')
        expect(res.body).toHaveProperty('totalPages')
        expect(res.body).toHaveProperty('limit')
        expect(res.body).toHaveProperty('skips')
        expect(res.body).toHaveProperty('data')
    })
})

describe('Update Task', () => {
  let taskId
  beforeAll(async () => {
      token = await getToken()
      const res = await supertest(app)
    .post(`/api/tasks`)
    .send(todo)
    .set("Authorization", `Bearer ${token}`);

    taskId = res.body.data._id
  })

  afterAll(async () => {
       await supertest(app)
        .delete(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
  })

    it('Should update Task Name/Status', async () => {
        const res = await supertest(app)
            .patch(`/api/tasks/${taskId}`)
            .send({
                task: 'Updated Todo',
                done: true
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('updatedAt')
    })
})

describe('Delete Task', () => {
  let taskId
  beforeAll(async () => {
      token = await getToken()
      const res = await supertest(app)
    .post(`/api/tasks`)
    .send(todo)
    .set("Authorization", `Bearer ${token}`);

    taskId = res.body.data._id
  })
  
    it('Should delete Task By Id', async () => {
        const res = await supertest(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
    })

    it('Should delete all completed Task', async () => {
      const res = await supertest(app)
          .delete(`/api/tasks`)
          .set('Authorization', `Bearer ${token}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('message')
  })
})



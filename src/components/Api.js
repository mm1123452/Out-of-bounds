class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl,
    this.headers = options.headers
  }

  postPledge() {
    return fetch(`${this.baseUrl}/pledges`, {
      method: "POST",
      headers: this.headers,

      body: JSON.stringify({
        Name: "Jennie",
        Surname: "Doctor",
        Email: "test@test.com",
        Pledge: "25",
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Api;

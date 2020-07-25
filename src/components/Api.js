class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl,
    this.headers = options.headers
  }

  postPledge({Name, Surname, Email, Pledge}) {
    return fetch(`${this.baseUrl}/pledges`, {
      method: "POST",
      headers: this.headers,

      body: JSON.stringify({
        Name,
        Surname,
        Email,
        Pledge
      }),
    })
      .then((res) => {
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

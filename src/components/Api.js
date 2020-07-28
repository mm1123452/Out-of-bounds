class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  postPledge({ name, surname, email, pledge }) {
    fetch(`${this._baseUrl}/pledges`, {
      method: 'POST',
      headers: this._headers,

      body: JSON.stringify({
        Name: name,
        Surname: surname,
        Email: email,
        Pledge: pledge
      })
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

class ApiService {
  URL = "https://f12-a2183-default-rtdb.firebaseio.com/list.json";

  async GetContactList() {
    const List = await fetch(this.URL)
      .then(responce => {
        return responce.json();
      })
      .then(data => {
        if (data == null) {
          return [];
        } else {
          return data;
        }
      })
      .catch(err => console.log(err));
    return List;
  }

  async UpdateDatabase(List) {
    const result = await fetch(this.URL, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(List)
    });
    return result;
  }
}

const API = new ApiService();
export default API;

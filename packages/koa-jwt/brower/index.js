const name = document.getElementById("name");
const password = document.getElementById("password");

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/login", {
    method: "POST",
    body: JSON.stringify({ name: name.value, password: password.value }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      localStorage.setItem("token", json.token);

      let getUserBtn = document.getElementById("button");
      if (!getUserBtn) {
        getUserBtn = document.createElement("button");
        getUserBtn.id = "button";
        getUserBtn.innerHTML = "获取用户信息";
        getUserBtn.onclick = () => {
          console.log(localStorage.getItem("token"));
          fetch("/getLoginInfo", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then((res) => alert(res.tokenData.name));
        };
        document.body.appendChild(getUserBtn);
      }
    });
});

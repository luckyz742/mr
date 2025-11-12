// 发布朋友圈动态
function postMoment() {
  const textarea = document.querySelector("textarea");
  const postContent = textarea.value.trim();
  if (postContent === "") return;

  // 发布内容显示
  const postList = document.querySelector(".post-list");
  const newPost = document.createElement("div");
  newPost.classList.add("post-item");
  newPost.innerHTML = `
    <p>${postContent}</p>
    <span>刚刚</span>
  `;
  postList.appendChild(newPost);

  // 清空输入框
  textarea.value = "";
}

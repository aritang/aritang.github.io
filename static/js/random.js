(function () {
  try {
    var el = document.getElementById("random-urls");
    if (!el) return;

    var txt = el.textContent || "[]";
    var data = JSON.parse(txt);           // first parse
    if (typeof data === "string") data = JSON.parse(data);  // <-- handles double-encoded case

    var posts = Array.isArray(data) ? data : [];
    if (posts.length === 0) return;

    var idx = (crypto && crypto.getRandomValues)
      ? crypto.getRandomValues(new Uint32Array(1))[0] % posts.length
      : Math.floor(Math.random() * posts.length);

    var fb = document.getElementById("fallback");
    if (fb) fb.style.display = "none";
    location.replace(posts[idx] + (location.search || ""));
  } catch (_) {}
})();

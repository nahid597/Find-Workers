function findWorkerAgain() {

    const user_id = window.location.search.replace(/^.*?\=/, '');

    window.location.href = "http://127.0.0.1:4444/map/map.component.html?_id=" + user_id;
}
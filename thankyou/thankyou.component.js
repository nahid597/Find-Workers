function findWorkerAgain() {

    const user_id = window.location.search.replace(/^.*?\=/, '');

    window.location.href = "http://192.168.0.122:4487/map/map.component.html?_id=" + user_id;
}
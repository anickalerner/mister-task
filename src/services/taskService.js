import httpService from './httpService';

export default {
  add,
  query,
  remove,
  update,
  start,
  undoAll
};

function query() {
  return httpService.get(`task`);
}

function remove(id) {
  return httpService.delete(`task/${id}`);
}

function add(task) {
  return httpService.post(`task`, task);
}

function update(task) {
  return httpService.put(`task`, task);
}

function start(id){
  return httpService.put(`task/${id}/start`);
}

function undoAll(){
  return httpService.put('task/undo');
}
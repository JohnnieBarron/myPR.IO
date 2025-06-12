import sendRequest from './sendRequest';

const BASE_URL = '/api/user';

export async function getUserById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function updateUserProgress(userId, progressEntry) {
  return sendRequest(`${BASE_URL}/${userId}/progress`, 'PUT', progressEntry);
}

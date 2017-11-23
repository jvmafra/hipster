import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {}

  public getAccessToken() {
    return localStorage.getItem('access_token');
  }

  public storeUser(authUser) {
    localStorage.setItem('access_token', authUser.token);
    localStorage.setItem('username', authUser.user.username);
    localStorage.setItem('name', authUser.user.name);
  }

  public storeName(name) {
    localStorage.setItem('name', name);
  }

  public getStoreName() {
    return localStorage.getItem('name');
  }

  public getStoreUsername() {
    return localStorage.getItem('username');
  }

  public removeUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    localStorage.removeItem('username');
  }

}

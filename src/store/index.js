import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      userInfo: {},
      access_token: null,
    },
  
    mutations: {
      [types.LOGIN]: (state, data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('userInfo', JSON.stringify(data))
        state.access_token = data.access_token;
        state.userInfo = data;
      },
  
      [types.LOGOUT]: (state) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');
        state.access_token = null;
      }
    }
  })

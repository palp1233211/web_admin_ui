import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

function hasPermission(router_arr, route) {
  if (route.meta && route.meta.id) {
    return router_arr.indexOf(route.meta.id) !== -1
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }


export function filterAsyncRoutes(routes, router_arr) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(router_arr, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, router_arr)
      }
      res.push(tmp)
    }
  })

  return res
}


const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

// const actions = {
//   generateRoutes({ commit }, roles) {
//     return new Promise(resolve => {
//       let accessedRoutes
//       if (roles.includes('admin')) {
//         accessedRoutes = asyncRoutes || []
//       } else {
//         accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
//       }
//       commit('SET_ROUTES', accessedRoutes)
//       resolve(accessedRoutes)
//     })
//   }
// }

const actions = {
    generateRoutes({ commit }, router_arr) {
      return new Promise(resolve => {
        let accessedRoutes
        accessedRoutes = filterAsyncRoutes(asyncRoutes, router_arr)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

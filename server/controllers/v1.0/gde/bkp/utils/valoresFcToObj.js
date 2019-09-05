// import stringToBoolean from './stringToBoolean'

// /**
//  * Valores FC, List to OBJ
//  * @param list - Array Valores FC
//  * @param sep - Separator
//  * @returns {Object} - Object Valores FC
//  */
// export default function (list, sep = '|') {
//   try {
//     const o = {}
//     list.forEach((v) => {
//       const a = v.split(sep)
//       o[a[0]] = stringToBoolean(a[1])
//     })
//     return o
//   } catch (e) {
//     return (list) ? list : {}
//   }
// }

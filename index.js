const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      let newCollection
      if ( collection instanceof Array ) {
        newCollection = collection.slice()
      } else {
        newCollection = Object.values(collection)
      }
      for (let i = 0; i < newCollection.length; i++) {
        callback(newCollection[i])
      }
      return collection
    },

    map: function(collection, callback) {
      let newCollection
      if (collection instanceof Array) {
        newCollection = collection.slice()
      } else {
        newCollection = Object.values(collection)
      }
      for (let i = 0; i < newCollection.length; i++) {
        newCollection[i] = callback(newCollection[i])
      }
      return newCollection
    },

    reduce: function(collection, callback, acc) {
      let newCollection = collection.slice(0)

      if (!acc) {
        acc = collection[0]
        newCollection = newCollection.slice(1)
      }
      for ( let i = 0; i < newCollection.length; i++ ) {
        // here's where I'm stuck
        acc = callback(acc, newCollection[i], newCollection)
      }

      return acc
    },

    find: function(collection, predicate) {
      if (!collection instanceof Array) {
        collection = Object.values(collection)
      }

      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          return collection[i]
        }
      }

      return undefined
    },

    filter: function(collection, predicate) {
      const newCollection = []

      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          newCollection.push(collection[i])
        }
      }
      return newCollection
    },

    size: function(collection) {
      if (!(collection instanceof Array)) {
        let newCollection = Object.keys(collection)
        return newCollection.length
      } else {
        return collection.length
      }
    },

    first: function(array, n = false) {
      if (n) {
        return array.slice(0, n)
      } else {
        return array[0]
      }
    },

    last: function(array, n = false ) {
      if (n) {
        return array.slice(array.length - n, array.length)
      } else {
        return array[array.length - 1]
      }
    },

    compact: function(array) {
      const newArray = []

      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          newArray.push(array[i])
        }
      }

      return newArray
    },

    sortBy: function(array, callback) {
      let sortedArray = array.slice()
      return sortedArray.sort((a, b) => callback(a) - callback(b))
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === 'function') {
          functionNames.push(key)
        }
      }
      return functionNames.sort()
    },

    uniqSorted: function(collection, callback) {
      const sorted = [collection[0]]
      for (let i = 1; i < collection.length; i++) {
        if (sorted[i - 1] != collection[i]) {
          sorted.push(collection[i])
        }
      }
      return sorted
    },

    uniq: function(array, isSorted, callback = false) {
      if(isSorted) {
        return fi.uniqSorted(array, callback)
      } else if (!callback) {
        return Array.from(new Set(array))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of array) {
          const moddedVal = callback(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(object) {
      return Object.keys(object)
    },

    values: function(object) {
      return Object.values(object)
    }

  }
})()

fi.libraryMethod()

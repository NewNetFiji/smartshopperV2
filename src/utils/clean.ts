type GenericObject = { [key: string]: any };

export function clean(obj: GenericObject ) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
    return obj
  }
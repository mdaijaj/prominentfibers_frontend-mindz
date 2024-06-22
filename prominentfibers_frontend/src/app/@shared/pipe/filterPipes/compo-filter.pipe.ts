import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compoFilter'
})
export class CompoFilterPipe implements PipeTransform {

  transform(value: any[], searchTerm:any) {
  
    
    

  // return value.filter(function(search:any)
  // {
  //   return search.fullName.toLowerCase().indexOf(searchTerm) > -1
  // })
  // }

  let nameAuther = value.filter(function(search:any)
  {
    return search.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
  })
  
  
  return nameAuther

  }

}

type RecordItem = {
  tags:Tag[]
  notes:string
  type:string
  amount:number  //数据类型
  createAt?:string  //类 /构造函数
}

type Tag = {
  id:string
  name:string
}

type RootState ={
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?:Tag,
}

type TagListModel = {
  data:Tag[]
  fetch:() => Tag[]
  create:(name:string) => 'success'| 'duplicated' 
  update:(id:string,name:string) => 'success' | 'duplicated' | 'not found'
  remove:(id:string) => boolean
  save:() => void
}

interface Window {
}

import clone from "@/lib/clone";

const localStorageKeyName = 'recordList'

let data:RecordItem[] | undefined = undefined;

const recordStore = {
  recordList : [] as RecordItem[],
  fetchRecords(){
    this.recordList =  JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList
  },
  saveRecords(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList))
  },
  createRecord(record:RecordItem){
    const record2 : RecordItem = clone(record);
    record2.createAt = new Date().toISOString();
    this.recordList?.push(record2);
    // 可选链语法
    recordStore.saveRecords()
  }
}

recordStore.fetchRecords();

export default recordStore;
import InventoryTable from "./InventoryTable";
const FileData = (props) => {
  let itemFile = props.file;
  let updatedFile = {};
  for (const record of itemFile) {
    let val = record["name"].toString();
    if (updatedFile[val]) {
      let obj = {};
      obj[record["batch"]] = {
        stock: +record["stock"],
        deal: +record["deal"],
        free: +record["free"],
        mrp: +record["mrp"],
        rate: +record["rate"],
        exp: record["exp"],
      };
      updatedFile[val]["ALL"]["stock"] += +record["stock"];
      if (
        record["free"] * (1.0 / record["deal"]) <
        updatedFile[val]["ALL"]["free"] *
          (1.0 / updatedFile[val]["ALL"]["deal"])
      ) {
        updatedFile[val]["ALL"]["free"] = record["free"];
        updatedFile[val]["ALL"]["deal"] = record["deal"];
      }
      let d1 = new Date(updatedFile[val]["ALL"]["exp"]);
      let d2 = new Date(record["exp"]);
      if (d1.getTime() > d2.getTime()) {
        updatedFile[val]["ALL"]["exp"] = record["exp"];
      }
      if (updatedFile[val]["ALL"]["mrp"] < record["mrp"]) {
        updatedFile[val]["ALL"]["mrp"] = record["mrp"];
      }
      if (updatedFile[val]["ALL"]["rate"] < record["rate"]) {
        updatedFile[val]["ALL"]["rate"] = +record["rate"];
      }
      if (updatedFile[val][record['batch']]){
        updatedFile[val][record['batch']]['stock']+=+record['stock']
      }
      else{

          updatedFile[val] = { ...updatedFile[val], ...obj };
      }
    } else {
      let obj1 = {};
      obj1["ALL"] = {
        stock: +record["stock"],
        deal: +record["deal"],
        free: +record["free"],
        mrp: +record["mrp"],
        rate: +record["rate"],
        exp: record["exp"],
      };
      obj1[record["batch"]] = {
        stock: +record["stock"],
        deal: +record["deal"],
        free: +record["free"],
        mrp: +record["mrp"],
        rate: +record["rate"],
        exp: record["exp"],
      };

      let newobj = {};
      newobj[val] = { ...obj1 };
      let newupdatedFile = { ...updatedFile, ...newobj };
      updatedFile = { ...newupdatedFile };
    }
  }
  const newupdatedFile = [];
  for (const key in updatedFile) {
    newupdatedFile.push({ name: key, ...updatedFile[key] });
  }
  return <InventoryTable maintable={newupdatedFile} />;
};

export default FileData;

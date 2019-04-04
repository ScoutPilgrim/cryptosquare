
let answerStr = '';
let normalStr = '';
const regEx = /[.,\/#!$%\^&\*;:{}='"\-_`~()\]\[\?]/g;

function clearArrays(){
  console.log('Clearing out strings!');
  inputStr = [];
  answerStr = '';
  normalStr = '';
};

function generateSquare(myLength, myStr){
  console.log('generateSquare is being called for '+myStr+" of length "+myLength);
  var col;
  var row;
  var sq = Math.sqrt(myLength);
  if((sq%1) === 0){
    console.log('We found a prefect Square!');
    col = row = sq;
    console.log("Our array is " + row + " x " + col + "!");
  }else{
    col = Math.round(sq);
    console.log('Number of Columns is ' + col);
    row = whichSq(col, myLength);
  }
  var mySquare = initArray(col, row, myStr);
  console.log(mySquare);
  printArray(col, row);
  answerStr = cryptoLogic(col, row, mySquare);
  console.log(answerStr);
  normalStr = answerStr.replace(/\s/g,"");
  normalStr = normalizeText(normalStr, col, row);
  console.log('Text turned back into: ' +normalStr);
  return answerStr;
};

function whichSq(myCol, myLength){
  console.log('whichSq is being called for '+myCol);
  var numChk = Math.pow(myCol, 2);
  var row;
  if(numChk < myLength){
    row = myCol + 1;
  }else{
    row = myCol;
  }
  return row;
};

function printArray(myCol, myRow){
  console.log('Printing out coordinates of our 2D array!');
  var arrStr = '';
  for(var j = 0; j < myRow; j++){
    arrStr += 'R ';
    for(var i = 0; i < myCol; i++){
      if(i === 0){
        arrStr += 'C ';
      }
      if(i === (myCol - 1)){
        arrStr += '[' +j+ ',' +i+ ']\n';
      }else{
        arrStr += '[' +j+ ',' +i+ ']';
      }
    }
  }
  console.log(arrStr);
};

function initArray(myCol, myRow,  myStr){
  console.log('Initializing our 2D array that is '+myCol+' x '+myRow);
  var retArr = [];
  for(var j = 0; j < myRow; j++){
    var innerArr = [];
    for(var i = 0; i < myCol; i++){
      if(i === myStr.length){
        console.log('Found end of String, end logic');
        break;
      }
      innerArr.push(myStr[i]);
      console.log('Adding ' + myStr[i] + ' at (' +j+ ',' +i+ ')');
    }
    myStr = myStr.substring(innerArr.length);
    retArr.push(innerArr);
  }
  return retArr;
};

function cryptoLogic(myCol, myRow, myArr){
  console.log('myRow = ' +myRow+ ', myCol = '+myCol);
  var output = '';
  var secondBr = false;
  var iter = 0;
  for(var col = 0; col < myCol; col++) {
    for(var row = 0; row < myRow; row++) {
      console.log('arr['+row+','+col+'] is: ' + myArr[row][col]);
      if(myArr[row][col] != null){
        if(iter === 5){
          output += ' ';
          iter = 0;
        }
        output += myArr[row][col];
        iter++;
      }else{
        console.log('Reached an unpopulated index of myArr at (' + col + ',' + row + ')!' );
        continue;
      }
    }
  }
  return output;
};

// function normalizeText(encryptStr, myCol, myRow){
//   var answerStr = '';
//   var inbounds = true;
//   var val;
//   var whtspc = ((myCol * myRow) - encryptStr.length);
//   var colSpc = myCol - whtspc;
//   console.log('WhiteSpace Amount: '+ whtspc);
//   console.log(myCol);
//   console.log(myRow);
//   console.log(encryptStr.length);
//   for(var j = 0; j < myRow; j++){
//     for(var i = 0; i < myCol; i++){
//       if(i <= colSpc){
//         val = (i * myRow) + j;
//         console.log(encryptStr[val]);
//       }else{
//         // if(j >= wtspc){
//         //
//         // }
//          val = (i * (myRow - 1) + j);
//          console.log(encryptStr[val]);
//       }
//       console.log(val);
//       answerStr += encryptStr[val];
//     }
//   }
//
//   return answerStr;
// };

$(document).ready(function(){
  $('#myForm').submit(function(event){
    console.log('Submit function is being called correctly!');
    event.preventDefault();
    clearArrays();
    var inputStr = [];
    var len;
    inputStr = $('#myInput').val();
    inputStr = inputStr.replace(regEx, '');
    inputStr = inputStr.replace(/\s/g,"");
    console.log('Sentence that was input is: [' + inputStr + ']');
    len = inputStr.length;
    generateSquare(len, inputStr);
    $('#myAns p').text(answerStr);
  });
});

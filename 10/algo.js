//그럼 직접 문자열을 trie에 넣어보며 이해해 보도록 하겠습니다.

//먼저 hell 이라는 문자열을 trie 에 삽입하게 되면 첫 글자인 h 가 root 노드의 자식인지 확인합니다.

//최초의 root 는 자식이 존재하지 않기때문에, h 라는 값을 가지는 자식 또한 없습니다.
//그럴 경우, h 라는 자식을 노드로 만들어줍니다.
//h 를 삽입했으니 이번에는 e 를 삽입할 차례입니다.
//h 노드의 경우도, 방금 만들어진 노드이기때문에 he 라는 자식이 존재하지 않습니다.
///같은 방식으로 he 라는 자식을 노드로 만들어줍니다.
//같은 방식으로 l 을 두번 넣게 되면, hell 이라는 문자열의 삽입은 종료됩니다.
//문자열의 삽입이 종료되었기 때문에, 마지막 자식 노드의 end 를 true 로 변경해줍니다.

//이때 이와같은 트라이가 만들어지게 됩니다.

function changeValue(value) {
  return value;
}

const val = changeValue('h');
val = changeValue('he');

function rootMap(val) {
    const root = {
    value: value,
    children: [],
    end: false
  }
  

    if (typeof root.children != null || root.children != undefined) {
      
    } else {
      root.children.push(val);
    }
  

}


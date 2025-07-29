interface Image {
  display(): void;
}


class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk();
  }
  private loadFromDisk(): void {
    console.log(`${this.filename} 이미지를 디스크에서 로딩중...`);
  }

  display(): void {
    console.log('Displaying ' + this.filename);
  }
}


// 프록시 이미지 클래스
class ImageProxy implements Image {
  private realImage: RealImage | null = null;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): void {
    if (this.realImage === null) {
      console.log("처음 표시 요청! 이제 실제 이미지를 로딩합니다...");
      this.realImage = new RealImage(this.filename);
    } else {
      console.log("이미 로딩된 이미지! 바로 표시합니다.");
    }

    this.realImage.display();
  }

  isLoaded():boolean {
    return this.realImage !== null;
  }

  getFilename(): string {
    return this.filename;
  }
}


//성능 측정을 위한 헬퍼 함수
function measureTime<T>(operation: () => T, description: string): T {
  const startTime = Date.now();
  const result = operation();
  const endTime = Date.now();
  console.log(`${description} took ${endTime - startTime}ms`);
  return result;
}


// 단계별 테스트
console.log("=== 이미지 로딩 프록시 상세 분석 ===\n");

console.log("1단계 : 프록시 객체 생성");
console.log("-".repeat(50));

const image1: Image = measureTime(
  () => new ImageProxy("vacation.jpg"),
  "vacation.jpg 프록시 생성"
);

const image2: Image = measureTime(
  () => new ImageProxy("profile.png"), 
  "profile.png 프록시 생성"
);

//프록시 상태 확인
if (image1 instanceof ImageProxy) {
  console.log(`image1 로딩 상태: ${image1.isLoaded() ? "로딩됨" : "아직 로딩 안됨"}`);
}

if(image2 instanceof ImageProxy) {
  console.log(`image2 로딩 상태: ${image2.isLoaded() ? "로딩됨" : "아직 로딩 안됨"}`);
}

console.log("\n2단계 : 첫 번째 이미지 표시(지연 로딩 발생)");
console.log("-".repeat(50));

measureTime(
  () => image1.display(),
  "첫 번째 이미지 표시"
);
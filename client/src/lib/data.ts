import deskImage from '@assets/generated_images/modern_minimalist_white_desk_for_home_office.png';
import bookshelfImage from '@assets/generated_images/wide_modern_white_bookshelf_filling_the_frame.png';
import kidsBedImage from '@assets/generated_images/kids_bed_filling_the_frame.png';
import roomSceneImage from '@assets/room_scene_interactive.png';
import lampImage from '@assets/generated_images/modern_smart_desk_lamp.png';

export const products = [
  {
    id: 1,
    name: "로이 모션 데스크",
    price: 459000,
    category: "서재",
    image: deskImage,
    description: "높이 조절이 가능한 스마트 모션 데스크입니다. 재택근무의 필수품.",
    features: ["높이 조절", "케이블 정리", "충돌 방지 센서"]
  },
  {
    id: 2,
    name: "에디 화이트 책장",
    price: 189000,
    category: "서재",
    image: bookshelfImage,
    description: "깔끔한 화이트 톤의 책장입니다. 넉넉한 수납공간과 미니멀한 디자인.",
    features: ["E0 등급 목재", "견고한 선반", "모던 디자인"]
  },
  {
    id: 3,
    name: "팅클 키즈 침대",
    price: 320000,
    category: "키즈룸",
    image: kidsBedImage,
    description: "우리아이 첫 침대로 안전하고 아늑합니다. 둥근 모서리로 안전을 더했습니다.",
    features: ["E0 등급 목재", "안전 가드", "저상형 디자인"]
  },
  {
    id: 4,
    name: "올리버 메쉬 의자",
    price: 159000,
    category: "서재",
    image: roomSceneImage, // Using room scene as placeholder crop would be better but this works for mockup
    description: "오래 앉아있어도 편안한 메쉬 소재의 인체공학 의자입니다.",
    features: ["메쉬 등판", "요추 지지대", "틸팅 기능"]
  },
  {
    id: 5,
    name: "루미 스마트 램프",
    price: 79000,
    category: "조명",
    image: lampImage,
    description: "앱으로 제어하는 스마트 조명. 학습 모드와 휴식 모드를 지원합니다.",
    features: ["앱 제어", "밝기 조절", "색온도 조절"]
  }
];

export const spaceConcept = {
  title: "모던 홈 오피스",
  image: roomSceneImage,
  description: "집중력이 높아지는 화이트 톤의 홈 오피스. 로이 모션 데스크와 올리버 의자로 완벽한 업무 환경을 만들어보세요.",
  products: [1, 4, 5], // Desk, Chair, Lamp
  totalPrice: 459000 + 159000 + 79000
};

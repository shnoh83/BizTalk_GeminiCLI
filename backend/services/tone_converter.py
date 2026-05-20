import os
from dotenv import load_dotenv
from langchain_upstage import ChatUpstage
from langchain_core.messages import HumanMessage, SystemMessage
from backend.prompts.templates import PROMPTS

# .env 파일 로드
load_dotenv()

class ToneConverter:
    def __init__(self):
        api_key = os.getenv("UPSTAGE_API_KEY")
        if not api_key:
            raise ValueError("UPSTAGE_API_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요.")
        
        # ChatUpstage 인스턴스 초기화 (모델: solar-pro2)
        self.llm = ChatUpstage(
            api_key=api_key,
            model="solar-pro2"
        )

    async def convert(self, text: str, target_audience: str) -> str:
        """
        원문 텍스트를 대상에 맞는 말투로 변환합니다.
        """
        system_prompt = PROMPTS.get(target_audience, PROMPTS["team"])
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"변환할 원문: {text}")
        ]
        
        response = await self.llm.ainvoke(messages)
        return response.content

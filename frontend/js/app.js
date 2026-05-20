// API 설정
const API_BASE = window.location.origin;

// DOM 요소
const targetGroup = document.getElementById('targetGroup');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const outputSection = document.getElementById('outputSection');
const loading = document.getElementById('loading');
const convertBtn = document.getElementById('convertBtn');

// 1. 수신 대상 버튼 클릭 이벤트 처리
targetGroup.addEventListener('click', (e) => {
    if (e.target.classList.contains('target-btn')) {
        // 모든 버튼에서 active 제거
        document.querySelectorAll('.target-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // 클릭된 버튼에 active 추가
        e.target.classList.add('active');
    }
});

// 2. 말투 변환 함수
async function convertTone() {
    const text = inputText.value.trim();
    const activeBtn = document.querySelector('.target-btn.active');
    const target = activeBtn ? activeBtn.dataset.target : null;

    if (!text) {
        alert('내용을 입력해주세요.');
        return;
    }

    if (!target) {
        alert('수신 대상을 선택해주세요.');
        return;
    }

    // 로딩 상태 시작
    setLoading(true);

    try {
        const response = await fetch(`${API_BASE}/api/convert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                target_audience: target
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || '변환 중 오류가 발생했습니다.');
        }

        const data = await response.json();
        
        // 결과 출력
        outputText.value = data.converted_text;
        outputSection.style.display = 'block';
        
        // 결과 영역으로 스크롤
        outputSection.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error:', error);
        alert(`오류: ${error.message}`);
    } finally {
        // 로딩 상태 종료
        setLoading(false);
    }
}

// 3. 로딩 상태 처리 함수
function setLoading(isLoading) {
    if (isLoading) {
        loading.style.display = 'block';
        convertBtn.disabled = true;
        convertBtn.textContent = '변환 중...';
        outputSection.style.display = 'none';
    } else {
        loading.style.display = 'none';
        convertBtn.disabled = false;
        convertBtn.textContent = '변환하기';
    }
}

// 4. 결과 복사 함수
async function copyResult() {
    const text = outputText.value;
    if (!text) return;

    try {
        await navigator.clipboard.writeText(text);
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        
        copyBtn.textContent = '복사 완료! ✅';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('복사에 실패했습니다.');
    }
}

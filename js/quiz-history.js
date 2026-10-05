/* Chapter Two — Supabase Quiz History */
const QUIZ_SUPABASE_URL="https://bhtyestavehwaymfozxw.supabase.co";
const QUIZ_SUPABASE_KEY="sb_publishable_VpUhQZY8bczeIYv-oo8mLQ_YHPTjm7r";
const QUIZ_TABLE="quiz_answers";

function getQuizSessionId(){let id=localStorage.getItem("chapterTwoQuizSessionId");if(!id){id=crypto.randomUUID?crypto.randomUUID():`quiz-${Date.now()}-${Math.random().toString(36).slice(2)}`;localStorage.setItem("chapterTwoQuizSessionId",id)}return id}
function getQuizHeaders(){return{"apikey":QUIZ_SUPABASE_KEY,"Authorization":`Bearer ${QUIZ_SUPABASE_KEY}`,"Content-Type":"application/json"}}
async function saveQuizAttempt(score,total){try{const sessionId=getQuizSessionId();const previous=Number(localStorage.getItem("chapterTwoQuizAttempts")||"0");const attemptNumber=previous+1;const now=new Date().toISOString();const rows=quizData.map((q,i)=>({question_number:i+1,question:q.question,selected_option:"Accepted",created_at:now,session_id:sessionId,attempt_number:attemptNumber}));const response=await fetch(`${QUIZ_SUPABASE_URL}/rest/v1/${QUIZ_TABLE}`,{method:"POST",headers:{...getQuizHeaders(),"Prefer":"return=minimal"},body:JSON.stringify(rows)});if(!response.ok){throw new Error(await response.text())}localStorage.setItem("chapterTwoQuizAttempts",String(attemptNumber));localStorage.setItem("chapterTwoLastQuizScore",`${score}/${total}`);return true}catch(error){console.error("[Quiz History] Save failed:",error);return false}}
function openQuizHistory(){window.location.href="quiz-history.html"}

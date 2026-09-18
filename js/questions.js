const TABLES = [2,3,4,5,6,7,8,9];
class QuestionGenerator {
  next(player, settings){
    const tables=settings.tables.length?settings.tables:TABLES;
    let a,b;
    if(settings.questionMode==='sequence'){
      const n=player.sequence++; a=tables[Math.floor(n/9)%tables.length]; b=n%9+1;
    }else if(settings.questionMode==='review' && Object.keys(player.wrongQuestions).length && Math.random()<.6){
      const pool=Object.entries(player.wrongQuestions).flatMap(([key,count])=>Array(Math.min(count,5)).fill(key));
      [a,b]=pool[Math.floor(Math.random()*pool.length)].split('x').map(Number);
      if(!tables.includes(a)){a=tables[Math.floor(Math.random()*tables.length)];b=1+Math.floor(Math.random()*9);}
    }else{ a=tables[Math.floor(Math.random()*tables.length)]; b=1+Math.floor(Math.random()*9); }
    const correct=a*b;
    const candidates=[a*(b-1),a*(b+1),(a-1)*b,(a+1)*b,correct+a,correct-a,correct+b,correct-b,correct+1,correct-1,correct+2,correct-2,correct+10,correct-10]
      .filter(n=>n>0&&n<=90&&n!==correct);
    const unique=[...new Set(candidates)].sort(()=>Math.random()-.5);
    const answers=[correct,...unique.slice(0,2)].sort(()=>Math.random()-.5);
    return {a,b,correct,answers,key:`${a}x${b}`};
  }
}

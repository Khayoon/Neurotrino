import type { CSSProperties } from 'react';

// Original editorial mascots. Their metaphors are not efficacy or product claims.
export function SupplementArt({ slug, className = '', decorative = true }: { slug: string; className?: string; decorative?: boolean }) {
  const colors: Record<string, string> = { magnesium: '#8a82c6', 'vitamin-d': '#dca13a', 'omega-3': '#5896ae', creatine: '#c57c87', 'l-theanine': '#68957b', melatonin: '#7c78b8', collagen: '#7499a2', 'vitamin-c': '#d69840', 'vitamin-k2': '#6c925b', 'bpc-157': '#6b92a5', calcium: '#9a87b0', iron: '#ba7972', zinc: '#75a1aa', mullein: '#7b9b6d', nac: '#67a4ac', ginger: '#c39a65', psyllium: '#9b8ab7', 'vitamin-b12': '#bc8290' };
  const ink = '#48564e';
  const face = (x: number, y: number, sleepy = false) => <g stroke={ink} strokeWidth="3" strokeLinecap="round"><path d={sleepy ? `M${x-14} ${y}q5 6 10 0m12 0q5 6 10 0` : `M${x-10} ${y}v4m20-4v4`}/><path d={`M${x-4} ${y+13}q4 4 8 0`}/></g>;
  const braid = <g strokeLinecap="round" strokeLinejoin="round">
    <path d="M106 67Q150 53 194 67V180Q150 193 106 180Z" fill="#dce8df" stroke="#7498a0" strokeWidth="3"/>
    {[115,129,143,157,171,185].map(x => <path key={x} d={`M${x} 67V181`} stroke="#6e9ba5" strokeWidth="6"/>)}
    {[81,103,125,147,169].map(y => <g key={y}><path d={`M107 ${y}l86 13M107 ${y+13}l86-13`} stroke="#ebdcaf" strokeWidth="5"/><path d={`M108 ${y}l84 13`} stroke="#fff6dc" strokeWidth="1.5"/></g>)}
    <rect x="99" y="44" width="102" height="29" rx="10" fill="#b4cfca" stroke="#6a8c93" strokeWidth="3"/><rect x="99" y="177" width="102" height="29" rx="10" fill="#b4cfca" stroke="#6a8c93" strokeWidth="3"/>
    <path d="M112 53h74m-74 133h74" stroke="#edf4df" strokeWidth="3"/>
    {[111,189].map(x => <g key={x}><circle cx={x} cy="61" r="3" fill="#76959a"/><circle cx={x} cy="194" r="3" fill="#76959a"/></g>)}
  </g>;
  const bone = <g><path d="M132 77C115 90 100 75 104 60C108 42 128 42 137 54C146 42 166 42 170 60C174 75 159 90 142 77V164C159 151 174 166 170 181C166 199 146 199 137 187C128 199 108 199 104 181C100 166 115 151 132 164Z" fill="#f0ecd9" stroke="#839782" strokeWidth="3"/><path d="M136 91v60" stroke="#fffdf0" strokeWidth="4" strokeLinecap="round"/></g>;

  return <div className={`supplement-art ${className}`} style={{ '--art-color': colors[slug] || '#bd8584' } as CSSProperties} aria-hidden={decorative}>
    <svg viewBox="0 0 300 240" fill="none" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : `Illustration for ${slug}`}>
      <ellipse cx="150" cy="210" rx="72" ry="9" fill="currentColor" opacity=".12"/>
      <g className="floating-object" strokeLinejoin="round">
        <path d="M55 83v13m-6-6h12M237 144v12m-6-6h12" stroke="currentColor" strokeWidth="2" opacity=".55" strokeLinecap="round"/>
        {slug === 'magnesium' && <g>
          <path d="M96 169l-5 26m67-26l8 26" stroke="#655c81" strokeWidth="12" strokeLinecap="round"/>
          <path d="M78 135c-20-8-12-34 4-36-6-23 22-34 36-23 13-24 44-19 49 1 28-12 48 11 38 31 29 20 10 55-12 54-2 24-36 30-49 13-21 20-46 8-47-7-27 7-36-22-19-33Z" fill="#f6efdc" stroke="#aaa0be" strokeWidth="3"/>
          <path d="M90 112q7-17 21-7m3-20q15-5 17 8m-18 51q10 12 19-1m24-42q10-12 20 1" stroke="#d8cddd" strokeWidth="4" strokeLinecap="round"/>
          <ellipse cx="190" cy="143" rx="29" ry="35" transform="rotate(-18 190 143)" fill="#aaa0ce" stroke="#756b98" strokeWidth="2"/>
          <ellipse cx="216" cy="120" rx="9" ry="19" transform="rotate(48 216 120)" fill="#9587bb"/>
          {face(193,140,true)}
          <path d="M190 98l10-46 36 49Z" fill="#77689e"/><circle cx="201" cy="51" r="7" fill="#f5da99"/>
          <path d="M219 57h16l-16 18h16M244 34h11l-11 12h11" stroke="#9684b2" strokeWidth="3" strokeLinecap="round"/>
          <path d="M60 191q69 23 179 4" stroke="#b5a4cc" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {slug === 'vitamin-d' && <g>
          {Array.from({length:10},(_,i)=><path key={i} d="M150 23v18" transform={`rotate(${i*36} 150 116)`} stroke="#d7a144" strokeWidth="7" strokeLinecap="round"/>)}
          <circle cx="150" cy="116" r="61" fill="#efbd62" stroke="#b58b44" strokeWidth="2"/><path d="M113 85q15-22 38-19" stroke="#fff0bf" strokeWidth="9" strokeLinecap="round"/>
          {face(154,117)}<ellipse cx="125" cy="137" rx="8" ry="4" fill="#dc9760"/><ellipse cx="183" cy="137" rx="8" ry="4" fill="#dc9760"/>
        </g>}
        {slug === 'omega-3' && <g>
          <path d="M102 104C42 78 36 155 90 160" stroke="#427c91" strokeWidth="12"/>
          <path d="M177 116l35-20 23-37 15 8-21 57-40 34" fill="#77b0bd" stroke="#477e90" strokeWidth="3"/>
          <path d="M85 112q50-23 103 0l-7 74q-39 23-89 0Z" fill="#89bcc5" stroke="#477e90" strokeWidth="3"/>
          <ellipse cx="136" cy="111" rx="51" ry="14" fill="#bee0df" stroke="#477e90" strokeWidth="3"/>
          <path d="M127 94v-13h23v13" stroke="#477e90" strokeWidth="7"/>
          <path d="M102 125v49" stroke="#d5efeb" strokeWidth="6" strokeLinecap="round"/>
          <path d="M251 87q-19 24-13 35 9 15 21 0 7-11-8-35Z" fill="#e3b45e"/>
          {face(143,141)}<path d="M159 181q12-9 23 0l10-6v16l-10-6q-11 10-23-4Z" fill="#497f92"/>
        </g>}
        {slug === 'creatine' && <g>
          <path d="M126 51v-14h47v14" fill="#a96679"/><rect x="90" y="53" width="120" height="143" rx="29" fill="#dfa0ad" stroke="#995e71" strokeWidth="3"/>
          <path d="M108 82v57" stroke="#f7c9c9" strokeWidth="8" strokeLinecap="round"/>
          <path d="M162 71l-35 61h26l-13 42 45-66h-30Z" fill="#fff0bf" stroke="#bc885b" strokeWidth="2"/>
          <path d="M77 131l-19 14 11 10m154-22 19 12-11 10" stroke="#a96c7d" strokeWidth="6" strokeLinecap="round"/>
          <path d="M124 197l-5 8m60-8 5 8" stroke="#8a646b" strokeWidth="8" strokeLinecap="round"/>
        </g>}
        {slug === 'l-theanine' && <g>
          <path d="M199 116c60-9 46 65-4 54" stroke="#658b70" strokeWidth="12"/>
          <path d="M80 111h124l-11 66q-40 40-99 0Z" fill="#a8c4a1" stroke="#66866c" strokeWidth="3"/><ellipse cx="142" cy="111" rx="62" ry="15" fill="#ecedce" stroke="#66866c" strokeWidth="3"/><ellipse cx="142" cy="112" rx="48" ry="9" fill="#8aa378"/>
          <path d="M131 97c-8-38 9-61 31-64 3 30-7 47-31 64Z" fill="#749b77"/><path d="M132 95l22-47" stroke="#d6ddb5" strokeWidth="2"/>
          <path d="M109 82q-16-14-1-30m73 36q18-16 3-31" stroke="#9bb193" strokeWidth="4" strokeLinecap="round"/>
          {face(144,141,true)}<ellipse cx="146" cy="198" rx="83" ry="9" fill="#becbb0"/>
        </g>}
        {slug === 'melatonin' && <g>
          <path d="M168 34C108 114 167 178 226 163c-25 51-87 58-124 17-42-49-15-124 66-146Z" fill="#a195cb" stroke="#766793" strokeWidth="3"/>
          <path d="M117 80q-29 39-2 81" stroke="#d0c3e6" strokeWidth="7" strokeLinecap="round"/>
          {face(133,145,true)}<path d="m206 53 5 15 16 1-12 11 4 16-13-9-14 9 4-16-13-11 17-1Z" fill="#ead6a0" stroke="#b7a07a" strokeWidth="2"/>
          <circle cx="231" cy="123" r="5" fill="#c4afd1"/><circle cx="173" cy="112" r="4" fill="#c4afd1"/>
        </g>}
        {slug === 'collagen' && <g>{braid}<path d="M85 105H64m6-6-7 6 7 6m145 18h21m-6-6 7 6-7 6" stroke="#82a3a8" strokeWidth="3" strokeLinecap="round"/></g>}
        {slug === 'vitamin-c' && <g>
          <g transform="rotate(-7 142 130)"><rect x="79" y="75" width="126" height="121" rx="20" fill="#c2d9cd" stroke="#779d91" strokeWidth="3"/>
            <rect x="90" y="86" width="104" height="99" rx="13" stroke="#f7f4dd" strokeWidth="2" strokeDasharray="4 5"/>
            <path d="M141 78v116" stroke="#8bb3a3" strokeWidth="4"/>
            {[102,121,140].map(y=><path key={y} d={`M130 ${y}l22 12m-22 0 22-12`} stroke="#b68d47" strokeWidth="4" strokeLinecap="round"/>)}
            {face(137,160,true)}
          </g>
          <path d="M154 116L220 42Q228 38 225 47Z" fill="#edf1e9" stroke="#748b88" strokeWidth="3" strokeLinejoin="round"/>
          <path d="m218 49-6 7" stroke="#849b93" strokeWidth="2" strokeLinecap="round"/>
          <path d="M215 53C181 9 89 22 86 61c-2 19 18 23 28 10" stroke="#d6aa55" strokeWidth="5" strokeLinecap="round"/>
          <circle cx="219" cy="162" r="24" fill="#f6d898" stroke="#ba944e" strokeWidth="2"/><path d="M225 151c-18-9-24 19-5 22l6-2" stroke="#a47d3e" strokeWidth="4" strokeLinecap="round"/>
        </g>}
        {slug === 'vitamin-k2' && <g>
          {bone}
          <g transform="rotate(38 201 92)"><circle cx="201" cy="75" r="20" fill="#dfc68b" stroke="#a58c55" strokeWidth="3"/><circle cx="201" cy="75" r="9" fill="#faf2d8" stroke="#a58c55" strokeWidth="2"/><path d="M201 95v58m0-10h16v-10m-16-6h11" stroke="#b3985b" strokeWidth="10" strokeLinecap="round"/></g>
          <path d="M93 99v13m-6-6h12m111 60v17m-8-8h16" stroke="#95ae77" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="189" cy="180" r="6" fill="#b5c798"/>
        </g>}
        {slug === 'bpc-157' && <g>
          <circle cx="146" cy="119" r="78" fill="#dfebed" stroke="#7e9ca8" strokeWidth="2" strokeDasharray="5 7"/>
          <path d="M101 78h88q22 0 22 25t-22 25h-88q-22 0-22 25t22 25h66" stroke="#668c9d" strokeWidth="4"/>
          {[[101,78],[123,78],[145,78],[167,78],[189,78],[209,102],[189,128],[167,128],[145,128],[123,128],[101,128],[81,152],[101,178],[123,178],[145,178]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="8" fill={i%2?'#c9d9d8':'#92b4bf'} stroke="#668c9d" strokeWidth="2"/>)}
          <circle cx="208" cy="173" r="29" fill="#fbf2d8" stroke="#af9c74" strokeWidth="3"/>
          <path d="M199 167q0-13 11-11 13 3 3 13-6 4-6 10m0 7v1" stroke="#938260" strokeWidth="4" strokeLinecap="round"/>
        </g>}
        {slug === 'calcium' && <g transform="rotate(-20 137 122)">{bone}</g>}
        {slug === 'iron' && <g>
          <path d="M75 164l-25 13m28-39-30 1m37-25-20-12" stroke="#c08b81" strokeWidth="4" strokeLinecap="round"/>
          <ellipse cx="153" cy="125" rx="70" ry="57" transform="rotate(-18 153 125)" fill="#c5837e" stroke="#9a6665" strokeWidth="3"/><ellipse cx="151" cy="120" rx="37" ry="24" transform="rotate(-18 151 120)" fill="#a46168"/>
          <path d="M105 110q14-25 44-27" stroke="#e9b9a5" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="205" cy="74" r="26" fill="#dce9e2" stroke="#7d9b92" strokeWidth="2"/><circle cx="237" cy="59" r="17" fill="#e7eee4" stroke="#7d9b92" strokeWidth="2"/>
        </g>}
        {slug === 'zinc' && <g>
          <path d="M150 42l65 25v60q-2 46-65 76-63-30-65-76V67Z" fill="#9ec4c7" stroke="#608e96" strokeWidth="3"/>
          <path d="M150 59l48 19v47q-2 32-48 59-46-27-48-59V78Z" stroke="#d4e9df" strokeWidth="4"/>
          <path d="M140 94h20v20h20v20h-20v20h-20v-20h-20v-20h20Z" fill="#f8edcd"/>
        </g>}
        {slug === 'mullein' && <g>
          <path d="M149 194V59" stroke="#789366" strokeWidth="7" strokeLinecap="round"/>
          <path d="M143 169C79 183 62 117 85 66c50 5 71 42 58 103Z" fill="#a7bd8c" stroke="#718f64" strokeWidth="3"/>
          <path d="M158 165C222 179 239 113 216 62c-50 5-71 42-58 103Z" fill="#91ae7f" stroke="#65885c" strokeWidth="3"/>
          <g stroke="#dce5c5" strokeWidth="2" strokeLinecap="round"><path d="M89 82l45 77m-29-49-16 2m27 13 6-19m-8 33-17-1M211 78l-44 77m28-49 16 2m-26 13-6-19m8 33 17-1"/></g>
          <path d="M87 74l-5 4m-4 7-5 3m2 8-5 2m145-26 5 4m4 8 5 3m-1 8 5 2" stroke="#c3d2ae" strokeWidth="3" strokeLinecap="round"/>
          <path d="M149 66l-1-32" stroke="#7c9967" strokeWidth="4"/><circle cx="143" cy="46" r="7" fill="#ead490"/><circle cx="156" cy="39" r="7" fill="#e6c97e"/><circle cx="146" cy="27" r="6" fill="#ecd89d"/>
          <path d="M117 191q32 13 65-1" stroke="#aabd95" strokeWidth="5" strokeLinecap="round"/>
        </g>}
        {slug === 'nac' && <g>
          <path d="M150 41C114 81 82 108 90 151c5 39 40 56 70 51 51-8 66-54 46-87-14-25-37-50-56-74Z" fill="#dcecec" stroke="#8bb8bc" strokeWidth="3"/>
          <g transform="rotate(-30 151 122)" strokeLinecap="round"><path d="M137 105h-17c-30 0-30 38 0 38h17" stroke="#6c9eaa" strokeWidth="16"/><path d="M164 105h18c30 0 30 38 0 38h-18" stroke="#8cb4b9" strokeWidth="16"/><path d="M133 123h35" stroke="#ede3bb" strokeWidth="8" strokeDasharray="8 18"/></g>
          <path d="m146 82 6-11m18 80 8 10m-71-27-10 3" stroke="#d5b36f" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="219" cy="67" r="10" fill="#b6d3cc"/><circle cx="79" cy="169" r="7" fill="#d7c68d"/>
        </g>}
        {slug === 'ginger' && <g>
          <path d="M150 70c-14-18-6-35 7-32 12 3 14 23 12 31l30-15c19-10 32 13 12 26l-31 18 13 35c6 15 32 5 36 23 5 21-26 29-49 11l-17-12-15 20c-15 23-39 26-48 14-9-11 3-23 15-35l11-16-23-13c-20 8-40-3-35-18 4-13 23-8 34-10Z" fill="#d9b885" stroke="#aa895e" strokeWidth="3"/>
          <path d="m130 91 13 10m-19 24 14 9m17 12 13-9m14-52 4 10m-60 66 10 7" stroke="#b39365" strokeWidth="3" strokeLinecap="round"/>
          <path d="M150 61c-34-6-36-27-25-43 24 5 34 22 25 43Z" fill="#9aae7a"/>
          {face(159,113,true)}<path d="M83 187q-20-17-26-4m169 0q16-14 24-1" stroke="#d5bb91" strokeWidth="3" strokeLinecap="round"/>
        </g>}
        {slug === 'psyllium' && <g>
          <path d="M82 96h138l-13 89q-51 27-111 0Z" fill="#c7bfda" fillOpacity=".6" stroke="#9186a6" strokeWidth="3"/>
          <path d="M89 129q34 12 61 0t63 0l-9 53q-54 21-105 0Z" fill="#b4bfd4"/>
          <ellipse cx="152" cy="96" rx="69" ry="15" fill="#f5eddf" stroke="#9186a6" strokeWidth="3"/>
          {[[113,111],[145,107],[172,116],[192,109],[133,130],[167,140],[109,149],[185,160],[146,167]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="5" ry="3" transform={`rotate(-30 ${x} ${y})`} fill="#c7ad7f" stroke="#a59475" strokeWidth="1"/>)}
          <path d="M117 41q-15 21-11 30 10 17 21 0 4-9-10-30Zm64-13q-16 23-11 33 10 16 22 0 4-10-11-33Z" fill="#a0c4d1" stroke="#7da6b4" strokeWidth="2"/>
          {face(152,153,true)}
        </g>}
        {slug === 'vitamin-b12' && <g>
          <path d="M88 63c21-33 102-24 123 25 20 48-9 107-56 111-47 5-89-37-81-79" fill="#e6bcc1" stroke="#b58391" strokeWidth="3"/>
          <ellipse cx="151" cy="113" rx="37" ry="27" transform="rotate(22 151 113)" fill="#c18c9d"/>
          <path d="M119 67q39-9 64 22" stroke="#f7dada" strokeWidth="7" strokeLinecap="round"/>
          <g stroke="#9f728c" strokeWidth="3" strokeLinecap="round"><path d="M98 142l-32 17m-1 0-20-2m20 2-5 22m5-22 13 18M94 78l-28-24m1 0-19 7m19-7 2-18"/></g>
          {[[94,142],[65,159],[44,156],[60,182],[78,178],[94,78],[66,54],[48,61],[69,36]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%3===0?8:5} fill="#c7b3cf" stroke="#9d819f" strokeWidth="2"/>)}
        </g>}
        {slug.startsWith('collagen-') && <g>
          {slug !== 'collagen-capsules' ? <g><path d="M96 67h109l-9 130H105Z" fill={slug === 'collagen-enhanced' ? '#eac791' : '#d6e5df'} stroke="#b5918a" strokeWidth="3"/><path d="M97 76h106M103 173h96" stroke="#fff4dc" strokeWidth="5"/><g transform="translate(75 76) scale(.5)">{braid}</g><path d="M175 74l24-43 13 7-24 41" fill="#b99783"/>{slug === 'collagen-enhanced' && <g><circle cx="210" cy="161" r="25" fill="#f7dda4" stroke="#bc975c" strokeWidth="2"/><path d="M199 161h22m-11-11v22" stroke="#bc975c" strokeWidth="4" strokeLinecap="round"/></g>}</g> : <g><g transform="rotate(-25 126 120)"><rect x="92" y="42" width="65" height="142" rx="32" fill="#f4e2db" stroke="#b48989" strokeWidth="3"/><path d="M94 112h61v39a31 31 0 0 1-61 0Z" fill="#ce9899"/></g><g transform="translate(110 43) rotate(26 100 100)"><rect x="70" y="42" width="48" height="113" rx="24" fill="#f4e2db" stroke="#b48989" strokeWidth="2"/><path d="M71 96h46v35a23 23 0 0 1-46 0Z" fill="#c78e90"/></g></g>}
        </g>}
      </g>
    </svg>
  </div>;
}

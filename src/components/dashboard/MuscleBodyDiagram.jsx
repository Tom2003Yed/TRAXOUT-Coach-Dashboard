function muscleClass(active) {
    return `cursor-pointer stroke-[1.15] transition-colors duration-150 ${
        active ? 'fill-[#ef4444] stroke-[#fecaca]' : 'fill-[#314149] stroke-[#6b8089]'
    }`;
}

function Region({ names, activeMuscle, onMuscleEnter, onMuscleLeave, d }) {
    const active = names.includes(activeMuscle);
    return (
        <path
            d={d}
            className={muscleClass(active)}
            onMouseEnter={() => onMuscleEnter?.(names[0])}
            onMouseLeave={() => onMuscleLeave?.()}
        />
    );
}

function Pair({ children }) {
    return (
        <>
            {children}
            <g transform="translate(180 0) scale(-1 1)">{children}</g>
        </>
    );
}

function FrontMuscles(props) {
    return (
        <g>
            <Pair>
                <Region {...props} names={['Pectoralis Major']} d="M89 74 C80 66 70 68 64 78 C60 86 60 96 62 106 C70 112 80 110 89 104 Z" />
                <Region {...props} names={['Anterior Deltoids']} d="M62 70 C54 68 46 74 44 84 C43 92 46 100 52 104 L64 94 C66 84 66 74 62 70 Z" />
                <Region {...props} names={['Biceps Brachii']} d="M50 100 C46 104 44 114 44 126 C44 138 46 148 49 154 L59 150 C60 136 60 114 58 102 Z" />
                <Region {...props} names={['Triceps Brachii']} d="M42 98 C37 104 35 118 35 132 C35 146 37 156 40 162 L47 156 C47 140 47 114 48 102 Z" />
                <Region {...props} names={['Core']} d="M89 106 C80 110 74 118 72 128 L70 158 C76 172 84 178 89 180 Z" />
                <Region {...props} names={['Quadriceps']} d="M78 172 C70 176 64 186 62 204 L58 252 C58 266 62 276 70 280 L86 268 C88 230 86 196 84 180 Z" />
                <Region {...props} names={['Calves']} d="M64 278 C56 290 54 318 56 338 L64 348 L74 336 C74 312 70 290 72 280 Z" />
            </Pair>
            <path d="M89 112 L91 112 L91 176 L89 176 Z" className="pointer-events-none fill-[#1b252a] opacity-70" />
            <path d="M82 122 L98 122 M80 136 L100 136 M81 150 L99 150 M83 164 L97 164" className="pointer-events-none fill-none stroke-[#1b252a] stroke-[1.1] opacity-50" />
        </g>
    );
}

function BackMuscles(props) {
    return (
        <g>
            <Pair>
                <Region {...props} names={['Trapezius']} d="M89 62 C80 64 70 66 64 72 L60 86 C68 96 78 100 89 98 Z" />
                <Region {...props} names={['Rear Deltoids']} d="M62 70 C54 68 46 74 44 84 C43 92 46 100 52 104 L64 94 C66 84 66 74 62 70 Z" />
                <Region {...props} names={['Rhomboids']} d="M89 86 C82 86 76 90 74 98 L76 120 C80 124 86 124 89 122 Z" />
                <Region {...props} names={['Latissimus Dorsi']} d="M76 92 C66 96 58 108 56 124 L58 148 C64 158 74 162 84 154 L86 118 C84 104 82 96 76 92 Z" />
                <Region {...props} names={['Triceps Brachii']} d="M44 98 C38 104 36 118 36 134 C36 148 38 158 42 164 L50 156 C50 140 50 114 52 102 Z" />
                <Region {...props} names={['Erector Spinae']} d="M89 122 C84 124 80 130 80 138 L78 168 C82 172 86 174 89 174 Z" />
                <Region {...props} names={['Core']} d="M78 148 C70 152 66 162 66 172 L70 188 C76 192 84 190 89 186 L86 160 Z" />
                <Region {...props} names={['Gluteus Maximus']} d="M86 168 C74 170 64 178 62 190 C62 202 68 210 80 214 L89 208 L89 174 Z" />
                <Region {...props} names={['Hamstrings']} d="M80 208 C70 212 64 222 62 238 L58 268 C60 278 66 282 74 280 L86 262 C86 240 84 220 84 212 Z" />
                <Region {...props} names={['Calves']} d="M64 276 C55 288 52 314 54 336 L64 348 L74 334 C74 310 70 288 72 278 Z" />
            </Pair>
            <path d="M89 58 L91 58 L91 174 L89 174 Z" className="pointer-events-none fill-[#1b252a] opacity-80" />
        </g>
    );
}

export default function MuscleBodyDiagram({
    view,
    activeMuscle,
    onMuscleEnter,
    onMuscleLeave,
    className = 'h-80 w-full'
}) {
    const regionProps = { activeMuscle, onMuscleEnter, onMuscleLeave };

    return (
        <svg viewBox="0 0 180 360" className={className} role="img" aria-label={`${view} body muscle map`}>
            <g className="fill-[#1b252a] stroke-[#52636c] stroke-[1.5]">
                <ellipse cx="90" cy="28" rx="17" ry="20" />
                <path d="M82 46 L98 46 L104 62 L76 62 Z" />
                <path d="M76 60 C66 64 58 74 54 86 L50 148 C50 156 54 160 60 160 C64 160 66 154 66 148 L70 96 Z" />
                <path d="M104 60 C114 64 122 74 126 86 L130 148 C130 156 126 160 120 160 C116 160 114 154 114 148 L110 96 Z" />
                <path d="M48 146 C44 152 44 158 48 164 L58 166 L62 158 L58 152 Z" />
                <path d="M132 146 C136 152 136 158 132 164 L122 166 L118 158 L122 152 Z" />
                <path d="M76 150 C70 168 66 188 64 210 L58 260 L52 328 C52 334 56 338 64 338 L70 334 L82 262 L90 198 L98 262 L110 334 L116 338 C124 338 128 334 128 328 L122 260 L116 210 C114 188 110 168 104 150 L90 172 Z" />
                <path d="M52 328 L46 338 L70 338 L70 334 Z" />
                <path d="M128 328 L134 338 L110 338 L110 334 Z" />
            </g>

            {view === 'front' ? <FrontMuscles {...regionProps} /> : <BackMuscles {...regionProps} />}

            <g fill="none" className="pointer-events-none stroke-[#70818a] stroke-[1] opacity-55">
                <path d="M84 62 L90 70 L96 62" />
                <path d="M90 70 L90 172" />
                {view === 'front' ? (
                    <>
                        <path d="M72 148 C80 156 86 160 90 160 C94 160 100 156 108 148" />
                        <path d="M70 210 L90 202 L110 210" />
                    </>
                ) : (
                    <path d="M70 168 C80 176 86 180 90 180 C94 180 100 176 110 168" />
                )}
            </g>
        </svg>
    );
}

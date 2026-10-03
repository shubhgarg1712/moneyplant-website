import { GeneratedCreative, PosterDimensions, FlowchartStep, CashCycleNode, CreditGaugeData, ComparisonData, BenefitTreeData, HybridGrowthData } from '../types/creative.ts';

// In-memory cache for loaded high-res images
const imageCache: Map<string, HTMLImageElement> = new Map();

export async function loadImage(url: string): Promise<HTMLImageElement> {
  if (imageCache.has(url)) {
    const cached = imageCache.get(url)!;
    if (cached.complete && cached.naturalWidth > 0) {
      return cached;
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    img.onerror = () => {
      // Fallback: try without crossOrigin
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        imageCache.set(url, fallbackImg);
        resolve(fallbackImg);
      };
      fallbackImg.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      fallbackImg.src = url;
    };
    img.src = url;
  });
}

// Draw the exact MoneyPlant logo with vector precision on high-resolution canvas
export function drawMoneyPlantLogo(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number = 2.2,
  variant: 'color' | 'white' = 'color'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const isWhite = variant === 'white';
  const boxFill = isWhite ? 'rgba(16, 185, 129, 0.25)' : '#0D3B2E';
  const boxStroke = isWhite ? '#34D399' : 'none';

  // 1. Symbol Container (64x64 rounded rect with radius 16)
  ctx.beginPath();
  const radius = 16;
  const w = 64;
  const h = 64;
  ctx.roundRect(0, 0, w, h, radius);
  ctx.fillStyle = boxFill;
  ctx.fill();
  if (isWhite) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = boxStroke;
    ctx.stroke();
  }

  // 2. Central curving stem
  ctx.beginPath();
  ctx.moveTo(32, 52);
  ctx.lineTo(32, 20);
  ctx.lineWidth = 3.8;
  ctx.strokeStyle = '#34D399';
  ctx.lineCap = 'round';
  ctx.stroke();

  // 3. Leaf 1 (Left leaf)
  ctx.beginPath();
  ctx.moveTo(32, 42);
  ctx.bezierCurveTo(21, 42, 17, 35, 17, 28);
  ctx.bezierCurveTo(24, 28, 32, 35, 32, 42);
  ctx.closePath();
  ctx.fillStyle = isWhite ? '#34D399' : '#10B981';
  ctx.fill();

  // 4. Leaf 2 (Right leaf)
  ctx.beginPath();
  ctx.moveTo(32, 33);
  ctx.bezierCurveTo(43, 33, 47, 26, 47, 19);
  ctx.bezierCurveTo(40, 19, 32, 26, 32, 33);
  ctx.closePath();
  ctx.fillStyle = isWhite ? '#6EE7B7' : '#34D399';
  ctx.fill();

  // 5. Leaf 3 (Top leaf)
  ctx.beginPath();
  ctx.moveTo(32, 20);
  ctx.bezierCurveTo(26, 13, 32, 6, 32, 6);
  ctx.bezierCurveTo(32, 6, 38, 13, 32, 20);
  ctx.closePath();
  ctx.fillStyle = isWhite ? '#A7F3D0' : '#6EE7B7';
  ctx.fill();

  // 6. Gold prosperity accent dot
  ctx.beginPath();
  ctx.arc(32, 18, 2.8, 0, Math.PI * 2);
  ctx.fillStyle = '#FBBF24';
  ctx.fill();

  // 7. Typography: MONEY + PLANT
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = '800 28px "Plus Jakarta Sans", "Inter", sans-serif';

  const moneyColor = isWhite ? '#FFFFFF' : '#0D3B2E';
  const plantColor = isWhite ? '#34D399' : '#10B981';

  ctx.fillStyle = moneyColor;
  ctx.fillText('MONEY', 80, 36);

  const moneyWidth = ctx.measureText('MONEY').width;
  ctx.fillStyle = plantColor;
  ctx.fillText('PLANT', 80 + moneyWidth + 3, 36);

  // 8. Tagline: "We speak financial fluently"
  ctx.font = '600 12px "Inter", sans-serif';
  ctx.fillStyle = isWhite ? '#A7F3D0' : '#059669';
  ctx.fillText('“We speak financial fluently”', 82, 54);

  ctx.restore();
}

// Utility: wrap text accurately within a maximum width
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

// Utility: Draw rounded rectangle helper
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | number[],
  fillColor?: string,
  strokeColor?: string,
  strokeWidth: number = 2
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }
}

// -------------------------------------------------------------------------------------
// VECTOR ICON DRAWING ENGINE (High-resolution programmatic icons at 2160px+)
// -------------------------------------------------------------------------------------

export function drawVectorIcon(
  ctx: CanvasRenderingContext2D,
  icon: string,
  centerX: number,
  centerY: number,
  size: number = 48,
  color: string = '#10B981'
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(3, size / 14);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const half = size / 2;

  switch (icon) {
    case 'cash':
    case 'currency': {
      // Rupee symbol or clean banknote
      ctx.beginPath();
      // Draw ₹ symbol
      const rSize = size * 0.85;
      const topY = centerY - rSize * 0.45;
      ctx.moveTo(centerX - rSize * 0.35, topY);
      ctx.lineTo(centerX + rSize * 0.35, topY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX - rSize * 0.35, topY + rSize * 0.22);
      ctx.lineTo(centerX + rSize * 0.3, topY + rSize * 0.22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX - rSize * 0.15, topY);
      ctx.lineTo(centerX - rSize * 0.15, topY + rSize * 0.45);
      ctx.arc(centerX - rSize * 0.15, topY + rSize * 0.45, rSize * 0.32, -Math.PI / 2, Math.PI / 2, false);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX - rSize * 0.05, topY + rSize * 0.45);
      ctx.lineTo(centerX + rSize * 0.35, centerY + rSize * 0.5);
      ctx.stroke();
      break;
    }

    case 'inventory':
    case 'box': {
      // Clean 3D isometric box
      const bW = size * 0.42;
      const bH = size * 0.26;
      ctx.beginPath();
      // Top diamond
      ctx.moveTo(centerX, centerY - size * 0.42);
      ctx.lineTo(centerX + bW, centerY - size * 0.42 + bH);
      ctx.lineTo(centerX, centerY - size * 0.42 + bH * 2);
      ctx.lineTo(centerX - bW, centerY - size * 0.42 + bH);
      ctx.closePath();
      ctx.stroke();

      // Left face
      ctx.beginPath();
      ctx.moveTo(centerX - bW, centerY - size * 0.42 + bH);
      ctx.lineTo(centerX - bW, centerY + size * 0.25);
      ctx.lineTo(centerX, centerY + size * 0.25 + bH);
      ctx.lineTo(centerX, centerY - size * 0.42 + bH * 2);
      ctx.closePath();
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - size * 0.42 + bH * 2);
      ctx.lineTo(centerX, centerY + size * 0.25 + bH);
      ctx.lineTo(centerX + bW, centerY + size * 0.25);
      ctx.lineTo(centerX + bW, centerY - size * 0.42 + bH);
      ctx.closePath();
      ctx.stroke();
      break;
    }

    case 'trend_up':
    case 'sales':
    case 'growth': {
      // Ascending growth trendline with arrow head
      ctx.beginPath();
      ctx.moveTo(centerX - half * 0.8, centerY + half * 0.6);
      ctx.lineTo(centerX - half * 0.2, centerY + half * 0.1);
      ctx.lineTo(centerX + half * 0.2, centerY + half * 0.35);
      ctx.lineTo(centerX + half * 0.8, centerY - half * 0.65);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.moveTo(centerX + half * 0.45, centerY - half * 0.65);
      ctx.lineTo(centerX + half * 0.8, centerY - half * 0.65);
      ctx.lineTo(centerX + half * 0.8, centerY - half * 0.3);
      ctx.stroke();
      break;
    }

    case 'receivables':
    case 'invoice': {
      // Document with check / currency flow
      const docW = size * 0.6;
      const docH = size * 0.8;
      ctx.beginPath();
      ctx.roundRect(centerX - docW / 2, centerY - docH / 2, docW, docH, 8);
      ctx.stroke();

      // Inner lines
      ctx.beginPath();
      ctx.moveTo(centerX - docW * 0.3, centerY - docH * 0.2);
      ctx.lineTo(centerX + docW * 0.3, centerY - docH * 0.2);
      ctx.moveTo(centerX - docW * 0.3, centerY);
      ctx.lineTo(centerX + docW * 0.3, centerY);
      ctx.moveTo(centerX - docW * 0.3, centerY + docH * 0.2);
      ctx.lineTo(centerX + docW * 0.1, centerY + docH * 0.2);
      ctx.stroke();
      break;
    }

    case 'gauge':
    case 'meter': {
      // Speedometer arc & pointer
      const arcR = size * 0.4;
      ctx.beginPath();
      ctx.arc(centerX, centerY + size * 0.1, arcR, Math.PI * 0.8, Math.PI * 2.2);
      ctx.stroke();

      // Needle pointer
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + size * 0.1);
      ctx.lineTo(centerX + arcR * 0.65, centerY - arcR * 0.45);
      ctx.stroke();

      // Pivot
      ctx.beginPath();
      ctx.arc(centerX, centerY + size * 0.1, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'search': {
      // Magnifying glass
      const mr = size * 0.3;
      ctx.beginPath();
      ctx.arc(centerX - size * 0.1, centerY - size * 0.1, mr, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + mr * 0.5, centerY + mr * 0.5);
      ctx.lineTo(centerX + half * 0.8, centerY + half * 0.8);
      ctx.stroke();
      break;
    }

    case 'checklist': {
      // Clipboard with check
      const cW = size * 0.6;
      const cH = size * 0.75;
      ctx.beginPath();
      ctx.roundRect(centerX - cW / 2, centerY - cH / 2, cW, cH, 8);
      ctx.stroke();

      // Clip top
      ctx.beginPath();
      ctx.roundRect(centerX - cW * 0.25, centerY - cH / 2 - 4, cW * 0.5, 8, 4);
      ctx.stroke();

      // Check mark inside
      ctx.beginPath();
      ctx.moveTo(centerX - cW * 0.2, centerY);
      ctx.lineTo(centerX - cW * 0.05, centerY + cH * 0.15);
      ctx.lineTo(centerX + cW * 0.25, centerY - cH * 0.15);
      ctx.stroke();
      break;
    }

    case 'document': {
      // Page with folded top-right corner
      const dW = size * 0.55;
      const dH = size * 0.75;
      const fold = size * 0.2;
      const left = centerX - dW / 2;
      const top = centerY - dH / 2;

      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(left + dW - fold, top);
      ctx.lineTo(left + dW, top + fold);
      ctx.lineTo(left + dW, top + dH);
      ctx.lineTo(left, top + dH);
      ctx.closePath();
      ctx.stroke();

      // Dog-ear crease
      ctx.beginPath();
      ctx.moveTo(left + dW - fold, top);
      ctx.lineTo(left + dW - fold, top + fold);
      ctx.lineTo(left + dW, top + fold);
      ctx.stroke();
      break;
    }

    case 'analysis': {
      // 3 ascending bar chart bars
      const barW = size * 0.18;
      const base = centerY + half * 0.7;

      ctx.beginPath();
      ctx.roundRect(centerX - size * 0.35, base - size * 0.35, barW, size * 0.35, 4);
      ctx.roundRect(centerX - size * 0.09, base - size * 0.58, barW, size * 0.58, 4);
      ctx.roundRect(centerX + size * 0.17, base - size * 0.8, barW, size * 0.8, 4);
      ctx.fill();
      break;
    }

    case 'home':
    case 'property': {
      // Modern house outline
      const hW = size * 0.7;
      ctx.beginPath();
      // Roof
      ctx.moveTo(centerX, centerY - half * 0.8);
      ctx.lineTo(centerX + hW / 2, centerY - half * 0.1);
      ctx.lineTo(centerX - hW / 2, centerY - half * 0.1);
      ctx.closePath();
      ctx.stroke();

      // Walls
      ctx.beginPath();
      ctx.roundRect(centerX - hW * 0.42, centerY - half * 0.1, hW * 0.84, half * 0.9, 4);
      ctx.stroke();

      // Door
      ctx.beginPath();
      ctx.roundRect(centerX - hW * 0.15, centerY + half * 0.25, hW * 0.3, half * 0.55, [3, 3, 0, 0]);
      ctx.stroke();
      break;
    }

    case 'car':
    case 'vehicle': {
      // Sleek car silhouette
      const cW = size * 0.85;
      const cY = centerY + size * 0.05;
      ctx.beginPath();
      // Body
      ctx.moveTo(centerX - cW * 0.48, cY);
      ctx.lineTo(centerX - cW * 0.35, cY - size * 0.2);
      ctx.lineTo(centerX - cW * 0.15, cY - size * 0.2);
      ctx.lineTo(centerX + cW * 0.15, cY - size * 0.2);
      ctx.lineTo(centerX + cW * 0.38, cY);
      ctx.lineTo(centerX + cW * 0.48, cY);
      ctx.lineTo(centerX + cW * 0.48, cY + size * 0.15);
      ctx.lineTo(centerX - cW * 0.48, cY + size * 0.15);
      ctx.closePath();
      ctx.stroke();

      // Wheels
      ctx.beginPath();
      ctx.arc(centerX - cW * 0.26, cY + size * 0.16, size * 0.12, 0, Math.PI * 2);
      ctx.arc(centerX + cW * 0.26, cY + size * 0.16, size * 0.12, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'business': {
      // Modern corporate high-rise
      const bW = size * 0.55;
      const bH = size * 0.8;
      ctx.beginPath();
      ctx.roundRect(centerX - bW / 2, centerY - bH / 2, bW, bH, 6);
      ctx.stroke();

      // Window grid
      ctx.fillStyle = color;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 2; c++) {
          ctx.fillRect(
            centerX - bW * 0.35 + c * bW * 0.42,
            centerY - bH * 0.35 + r * bH * 0.25,
            bW * 0.26,
            bH * 0.14
          );
        }
      }
      break;
    }

    default: {
      // Default geometric emblem
      ctx.beginPath();
      ctx.arc(centerX, centerY, half * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

// -------------------------------------------------------------------------------------
// PROCEDURAL INFOGRAPHIC RENDERERS (Native Canvas 2D at 2160px+)
// -------------------------------------------------------------------------------------

// 1. FLOWCHART INFOGRAPHIC: 5 Sequential Steps (Enquiry -> Eligibility -> Docs -> Assessment -> Disbursement)
export function drawFlowchartInfographic(
  ctx: CanvasRenderingContext2D,
  steps: FlowchartStep[],
  x: number,
  y: number,
  w: number,
  h: number,
  isDark: boolean = false
) {
  const isHorizontal = w > h * 1.35;
  const count = steps.length;

  if (isHorizontal) {
    // Horizontal chain across landscape width
    const cardW = (w - (count - 1) * 36) / count;
    const cardH = Math.min(h * 0.72, 380);
    const startY = y + (h - cardH) / 2;

    steps.forEach((st, idx) => {
      const cardX = x + idx * (cardW + 36);

      // Card container
      drawRoundedRect(
        ctx,
        cardX,
        startY,
        cardW,
        cardH,
        28,
        isDark ? '#0F2C23' : '#FFFFFF',
        isDark ? '#1E4D3E' : '#E2E8F0',
        2.5
      );

      // Step Number circle
      const circleX = cardX + 54;
      const circleY = startY + 54;
      ctx.beginPath();
      ctx.arc(circleX, circleY, 30, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#124B3B' : '#E6F4EA';
      ctx.fill();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = isDark ? '#34D399' : '#0D3B2E';
      ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(st.stepNumber, circleX, circleY);
      ctx.textBaseline = 'alphabetic';

      // Vector Icon
      drawVectorIcon(ctx, st.icon, cardX + cardW - 54, circleY, 44, '#10B981');

      // Step Title
      ctx.fillStyle = isDark ? '#FFFFFF' : '#0D3B2E';
      ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(st.title, cardX + 32, startY + 140);

      // Subtitle
      ctx.fillStyle = isDark ? '#CBD5E1' : '#64748B';
      ctx.font = '500 22px "Inter", sans-serif';
      const subLines = wrapText(ctx, st.subtitle, cardW - 64);
      let subY = startY + 185;
      for (const line of subLines.slice(0, 3)) {
        ctx.fillText(line, cardX + 32, subY);
        subY += 32;
      }

      // Status pill at card bottom
      drawRoundedRect(
        ctx,
        cardX + 32,
        startY + cardH - 64,
        cardW - 64,
        42,
        21,
        isDark ? 'rgba(16, 185, 129, 0.18)' : '#ECFDF5',
        '#A7F3D0',
        1.5
      );
      ctx.fillStyle = isDark ? '#6EE7B7' : '#065F46';
      ctx.font = '700 18px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Stage ${idx + 1} Cleared`, cardX + cardW / 2, startY + cardH - 37);

      // Connecting arrow to next card
      if (idx < count - 1) {
        const arrowX = cardX + cardW + 8;
        const arrowY = startY + cardH / 2;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX + 20, arrowY);
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(arrowX + 14, arrowY - 7);
        ctx.lineTo(arrowX + 24, arrowY);
        ctx.lineTo(arrowX + 14, arrowY + 7);
        ctx.fillStyle = '#10B981';
        ctx.fill();
      }
    });
  } else {
    // Vertical / Staggered Layout for Square (2160x2160) or Portrait (2160x2700)
    const cardH = (h - (count - 1) * 24 - 40) / count;
    const cardW = w;

    steps.forEach((st, idx) => {
      const cardY = y + idx * (cardH + 24);

      drawRoundedRect(
        ctx,
        x,
        cardY,
        cardW,
        cardH,
        24,
        isDark ? '#0F2C23' : '#FFFFFF',
        isDark ? '#1E4D3E' : '#E2E8F0',
        2.5
      );

      // Number badge
      const circleX = x + 64;
      const circleY = cardY + cardH / 2;
      ctx.beginPath();
      ctx.arc(circleX, circleY, 34, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#124B3B' : '#E6F4EA';
      ctx.fill();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = isDark ? '#34D399' : '#0D3B2E';
      ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(st.stepNumber, circleX, circleY);
      ctx.textBaseline = 'alphabetic';

      // Step text
      ctx.fillStyle = isDark ? '#FFFFFF' : '#0D3B2E';
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(st.title, x + 128, cardY + cardH / 2 - 8);

      ctx.fillStyle = isDark ? '#CBD5E1' : '#64748B';
      ctx.font = '500 24px "Inter", sans-serif';
      ctx.fillText(st.subtitle, x + 128, cardY + cardH / 2 + 32);

      // Icon on right side
      drawVectorIcon(ctx, st.icon, x + cardW - 70, circleY, 52, '#10B981');

      // Connecting vertical line to next card
      if (idx < count - 1) {
        ctx.beginPath();
        ctx.moveTo(circleX, cardY + cardH);
        ctx.lineTo(circleX, cardY + cardH + 24);
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 3.5;
        ctx.stroke();
      }
    });
  }
}

// 2. WORKING CAPITAL CIRCULAR CASH CYCLE: Cash -> Inventory -> Sales -> Receivables -> Cash
export function drawWorkingCapitalCashCycle(
  ctx: CanvasRenderingContext2D,
  nodes: CashCycleNode[],
  centerX: number,
  centerY: number,
  radius: number,
  isDark: boolean = false
) {
  // 1. Center Core Hub
  const hubRadius = radius * 0.44;
  ctx.save();

  // Outer glowing pulse ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, hubRadius + 14, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Hub circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, hubRadius, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#0C2B22' : '#E6F4EA';
  ctx.fill();
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Hub text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = isDark ? '#34D399' : '#0D3B2E';
  ctx.font = '900 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WORKING', centerX, centerY - 28);
  ctx.fillText('CAPITAL', centerX, centerY + 10);

  ctx.fillStyle = isDark ? '#A7F3D0' : '#059669';
  ctx.font = '700 18px "Inter", sans-serif';
  ctx.fillText('CONTINUOUS LIQUIDITY', centerX, centerY + 46);
  ctx.textBaseline = 'alphabetic';

  // 2. Connecting Circular Flow Track
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = isDark ? 'rgba(52, 211, 153, 0.25)' : 'rgba(16, 185, 129, 0.3)';
  ctx.lineWidth = 5;
  ctx.setLineDash([16, 12]);
  ctx.stroke();
  ctx.setLineDash([]);

  // 3. Four Cycle Nodes (12, 3, 6, 9 o'clock)
  const count = nodes.length;
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top, right, bottom, left

  nodes.forEach((node, i) => {
    const angle = angles[i % 4];
    const nodeX = centerX + Math.cos(angle) * radius;
    const nodeY = centerY + Math.sin(angle) * radius;

    // Node pill card
    const cardW = 320;
    const cardH = 120;
    const cLeft = nodeX - cardW / 2;
    const cTop = nodeY - cardH / 2;

    drawRoundedRect(
      ctx,
      cLeft,
      cTop,
      cardW,
      cardH,
      28,
      isDark ? '#11352A' : '#FFFFFF',
      isDark ? '#34D399' : '#10B981',
      3
    );

    // Node Icon
    drawVectorIcon(ctx, node.icon, cLeft + 54, nodeY, 48, '#10B981');

    // Node labels
    ctx.textAlign = 'left';
    ctx.fillStyle = isDark ? '#FFFFFF' : '#0D3B2E';
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(node.label, cLeft + 100, nodeY - 4);

    ctx.fillStyle = isDark ? '#CBD5E1' : '#64748B';
    ctx.font = '500 20px "Inter", sans-serif';
    ctx.fillText(node.sublabel, cLeft + 100, nodeY + 28);

    // Directional Curved Arrow Arc between Node i and Node i+1
    const nextAngle = angles[(i + 1) % 4];
    const midAngle = angle + Math.PI / 4;
    const arrowX = centerX + Math.cos(midAngle) * radius;
    const arrowY = centerY + Math.sin(midAngle) * radius;

    // Flow chevron
    ctx.beginPath();
    ctx.arc(arrowX, arrowY, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#10B981';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 16px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('→', arrowX, arrowY);
    ctx.textBaseline = 'alphabetic';
  });

  ctx.restore();
}

// 3. CREDIT SCORE GAUGE & FINANCIAL DASHBOARD
export function drawCreditScoreGauge(
  ctx: CanvasRenderingContext2D,
  data: CreditGaugeData,
  x: number,
  y: number,
  w: number,
  h: number,
  isDark: boolean = false
) {
  ctx.save();
  const centerX = x + w / 2;
  const gaugeY = y + h * 0.38;
  const radius = Math.min(w * 0.36, 260);

  // 1. Semi-circular gauge background track
  ctx.beginPath();
  ctx.arc(centerX, gaugeY, radius, Math.PI, 0, false);
  ctx.lineWidth = 36;
  ctx.strokeStyle = isDark ? '#163D31' : '#E2E8F0';
  ctx.lineCap = 'round';
  ctx.stroke();

  // 2. Multi-stop credit gradient track
  const grad = ctx.createLinearGradient(centerX - radius, gaugeY, centerX + radius, gaugeY);
  grad.addColorStop(0, '#EF4444');   // 300 - Poor
  grad.addColorStop(0.35, '#F59E0B'); // 550 - Fair
  grad.addColorStop(0.68, '#10B981'); // 700 - Good
  grad.addColorStop(1, '#059669');   // 750-900 - Prime
  ctx.beginPath();
  ctx.arc(centerX, gaugeY, radius, Math.PI, Math.PI * 1.85, false);
  ctx.lineWidth = 36;
  ctx.strokeStyle = grad;
  ctx.lineCap = 'round';
  ctx.stroke();

  // 3. Large Score Display at Gauge Center
  ctx.textAlign = 'center';
  ctx.fillStyle = isDark ? '#FFFFFF' : '#0D3B2E';
  ctx.font = '900 84px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(data.score.toString(), centerX, gaugeY - 20);

  // Status Pill
  const pillW = 340;
  const pillH = 50;
  drawRoundedRect(
    ctx,
    centerX - pillW / 2,
    gaugeY + 10,
    pillW,
    pillH,
    25,
    isDark ? 'rgba(16, 185, 129, 0.25)' : '#E6F4EA',
    '#10B981',
    2
  );
  ctx.fillStyle = isDark ? '#6EE7B7' : '#047857';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('PRIME CREDIT PROFILE', centerX, gaugeY + 36);
  ctx.textBaseline = 'alphabetic';

  // Tick marks
  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '700 20px "Inter", sans-serif';
  ctx.fillText('300', centerX - radius - 15, gaugeY + 45);
  ctx.fillText('900', centerX + radius + 15, gaugeY + 45);

  // 4. Three Structured Factor Cards below the gauge
  const cardW = (w - 48) / 3;
  const cardH = 180;
  const cardsY = y + h * 0.58;

  data.factors.slice(0, 3).forEach((factor, i) => {
    const cardX = x + i * (cardW + 24);

    drawRoundedRect(
      ctx,
      cardX,
      cardsY,
      cardW,
      cardH,
      24,
      isDark ? '#0F2C23' : '#FFFFFF',
      isDark ? '#1E4D3E' : '#E2E8F0',
      2
    );

    // Top Impact badge
    drawRoundedRect(
      ctx,
      cardX + 24,
      cardsY + 24,
      130,
      34,
      17,
      isDark ? 'rgba(52, 211, 153, 0.2)' : '#ECFDF5',
      '#10B981',
      1.5
    );
    ctx.fillStyle = isDark ? '#34D399' : '#059669';
    ctx.font = '800 18px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(factor.impact, cardX + 89, cardsY + 41);
    ctx.textBaseline = 'alphabetic';

    // Factor name
    ctx.fillStyle = isDark ? '#FFFFFF' : '#0D3B2E';
    ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(factor.name, cardX + 24, cardsY + 98);

    // Factor description
    ctx.fillStyle = isDark ? '#CBD5E1' : '#64748B';
    ctx.font = '500 20px "Inter", sans-serif';
    const lines = wrapText(ctx, factor.desc, cardW - 48);
    let descY = cardsY + 130;
    for (const line of lines.slice(0, 2)) {
      ctx.fillText(line, cardX + 24, descY);
      descY += 26;
    }
  });

  // Regulatory Footnote
  ctx.fillStyle = isDark ? '#64748B' : '#94A3B8';
  ctx.font = '500 19px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.footnote, centerX, y + h - 15);

  ctx.restore();
}

// 4. COMPARISON TABLE INFOGRAPHIC: Dual Column Side-by-Side Comparison
export function drawComparisonGrid(
  ctx: CanvasRenderingContext2D,
  data: ComparisonData,
  x: number,
  y: number,
  w: number,
  h: number,
  isDark: boolean = false
) {
  ctx.save();
  const colW = (w - 36) / 2;
  const colH = h - 60;

  const colA = data.columnA;
  const colB = data.columnB;

  // Column A
  const colAX = x;
  drawRoundedRect(
    ctx,
    colAX,
    y,
    colW,
    colH,
    28,
    isDark ? '#0C261E' : '#FFFFFF',
    '#10B981',
    3
  );

  // Column A Header
  drawRoundedRect(
    ctx,
    colAX,
    y,
    colW,
    130,
    [28, 28, 0, 0],
    isDark ? '#10382C' : '#ECFDF5'
  );

  ctx.fillStyle = '#059669';
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(colA.badge, colAX + 36, y + 48);

  ctx.fillStyle = isDark ? '#FFFFFF' : '#0D3B2E';
  ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(colA.title, colAX + 36, y + 96);

  // Column A Points
  let pointY = y + 175;
  colA.points.forEach((pt) => {
    ctx.fillStyle = '#10B981';
    ctx.font = '800 26px "Inter", sans-serif';
    ctx.fillText('✓', colAX + 36, pointY + 24);

    ctx.fillStyle = isDark ? '#A7F3D0' : '#065F46';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(pt.label.toUpperCase(), colAX + 74, pointY + 12);

    ctx.fillStyle = isDark ? '#E2E8F0' : '#334155';
    ctx.font = '500 22px "Inter", sans-serif';
    const lines = wrapText(ctx, pt.value, colW - 100);
    let lineY = pointY + 42;
    for (const line of lines.slice(0, 2)) {
      ctx.fillText(line, colAX + 74, lineY);
      lineY += 28;
    }

    pointY += 105;
  });

  // Column B
  const colBX = x + colW + 36;
  drawRoundedRect(
    ctx,
    colBX,
    y,
    colW,
    colH,
    28,
    isDark ? '#0F1E29' : '#FFFFFF',
    isDark ? '#334155' : '#CBD5E1',
    2.5
  );

  // Column B Header
  drawRoundedRect(
    ctx,
    colBX,
    y,
    colW,
    130,
    [28, 28, 0, 0],
    isDark ? '#1E293B' : '#F1F5F9'
  );

  ctx.fillStyle = '#64748B';
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(colB.badge, colBX + 36, y + 48);

  ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
  ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(colB.title, colBX + 36, y + 96);

  // Column B Points
  pointY = y + 175;
  colB.points.forEach((pt) => {
    ctx.fillStyle = '#64748B';
    ctx.font = '800 26px "Inter", sans-serif';
    ctx.fillText('✦', colBX + 36, pointY + 24);

    ctx.fillStyle = isDark ? '#94A3B8' : '#475569';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(pt.label.toUpperCase(), colBX + 74, pointY + 12);

    ctx.fillStyle = isDark ? '#CBD5E1' : '#334155';
    ctx.font = '500 22px "Inter", sans-serif';
    const lines = wrapText(ctx, pt.value, colW - 100);
    let lineY = pointY + 42;
    for (const line of lines.slice(0, 2)) {
      ctx.fillText(line, colBX + 74, lineY);
      lineY += 28;
    }

    pointY += 105;
  });

  // Bottom note
  if (data.verdictNote) {
    ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    ctx.font = '500 20px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(data.verdictNote, x + w / 2, y + colH + 42);
  }

  ctx.restore();
}

// 5. HYBRID GROWTH VISUAL: High-Res Photography + Glowing Upward Trendline & Frosted Metrics
export function drawHybridGrowthOverlay(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  data: HybridGrowthData,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  // Draw base photo with clipping
  drawCoverImage(ctx, img, x, y, w, h, 36);

  // Scrim gradient
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, 'rgba(10, 32, 25, 0.45)');
  grad.addColorStop(0.55, 'rgba(10, 32, 25, 0.78)');
  grad.addColorStop(1, 'rgba(6, 22, 17, 0.95)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 36);
  ctx.fill();

  // Draw smooth upward exponential curve
  const chartLeft = x + 60;
  const chartRight = x + w - 60;
  const chartBottom = y + h - 160;
  const chartTop = y + 180;
  const chartW = chartRight - chartLeft;
  const chartH = chartBottom - chartTop;

  // Gradient fill under curve
  ctx.beginPath();
  ctx.moveTo(chartLeft, chartBottom);
  const values = data.trendValues;
  const stepW = chartW / (values.length - 1);

  values.forEach((v, idx) => {
    const ptX = chartLeft + idx * stepW;
    const ptY = chartBottom - (v / 100) * chartH;
    if (idx === 0) ctx.lineTo(ptX, ptY);
    else ctx.lineTo(ptX, ptY);
  });
  ctx.lineTo(chartRight, chartBottom);
  ctx.closePath();

  const areaGrad = ctx.createLinearGradient(x, chartTop, x, chartBottom);
  areaGrad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
  areaGrad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
  ctx.fillStyle = areaGrad;
  ctx.fill();

  // Upward line
  ctx.beginPath();
  values.forEach((v, idx) => {
    const ptX = chartLeft + idx * stepW;
    const ptY = chartBottom - (v / 100) * chartH;
    if (idx === 0) ctx.moveTo(ptX, ptY);
    else ctx.lineTo(ptX, ptY);
  });
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Floating milestone cards
  const cardW = Math.min((w - 80) / 3, 300);
  const cardH = 100;
  const cardY = y + h - 130;

  data.metrics.slice(0, 3).forEach((m, idx) => {
    const mX = x + 40 + idx * (cardW + 20);
    drawRoundedRect(ctx, mX, cardY, cardW, cardH, 20, 'rgba(13, 59, 46, 0.85)', '#34D399', 2);

    drawVectorIcon(ctx, m.icon, mX + 42, cardY + cardH / 2, 40, '#34D399');

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(m.label, mX + 76, cardY + 42);

    ctx.fillStyle = '#A7F3D0';
    ctx.font = '500 18px "Inter", sans-serif';
    ctx.fillText(m.value, mX + 76, cardY + 74);
  });

  ctx.restore();
}

// -------------------------------------------------------------------------------------
// FOOTER & HEADER SYSTEM
// -------------------------------------------------------------------------------------

// Draw official high-trust footer with MoneyPlant contact details scaled for 2160px+ resolution
function drawBrandFooter(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number
) {
  const isLandscape = width > height;
  const footerH = isLandscape ? 170 : 190;
  const footerY = height - footerH;

  // Background
  ctx.fillStyle = creative.theme.footerBgColor;
  ctx.fillRect(0, footerY, width, footerH);

  // Top accent line in Fresh Green
  ctx.fillStyle = '#10B981';
  ctx.fillRect(0, footerY, width, 6);

  // Left side: Company name & Tagline
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('MONEYPLANT FINSERVE', margin, footerY + 62);

  ctx.fillStyle = '#34D399';
  ctx.font = '600 24px "Inter", sans-serif';
  ctx.fillText('“We speak financial fluently”', margin, footerY + 98);

  // Compliance Footnote / Disclaimer
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '400 20px "Inter", sans-serif';
  ctx.fillText(creative.disclaimer, margin, footerY + 142);

  // Right side: Verified Contact Badges
  const rightX = width - margin;
  ctx.textAlign = 'right';

  // Phone
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 32px "Inter", sans-serif';
  ctx.fillText('📞  +91 8178419058', rightX, footerY + 62);

  // Web & Email
  ctx.font = '600 25px "Inter", sans-serif';
  ctx.fillStyle = '#34D399';
  ctx.fillText('🌐  moneyplant.in', rightX, footerY + 100);

  ctx.font = '400 22px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillText('✉️  info.mpfinserve@gmail.com', rightX, footerY + 142);
}

// Draw standard header bar with exact MoneyPlant logo and Category chip
function drawHeader(
  ctx: CanvasRenderingContext2D,
  width: number,
  creative: GeneratedCreative,
  margin: number
) {
  const topY = 75;
  const logoScale = 2.4;
  const logoVariant = creative.theme.isDarkTheme ? 'white' : 'color';
  drawMoneyPlantLogo(ctx, margin, topY, logoScale, logoVariant);

  // Right side category badge pill
  const badgeText = creative.categoryLabel.toUpperCase();
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  const textWidth = ctx.measureText(badgeText).width;
  const badgeW = textWidth + 60;
  const badgeH = 64;
  const badgeX = width - margin - badgeW;
  const badgeY = topY + 15;

  drawRoundedRect(
    ctx,
    badgeX,
    badgeY,
    badgeW,
    badgeH,
    32,
    creative.theme.badgeBgColor,
    creative.theme.isDarkTheme ? 'rgba(52, 211, 153, 0.4)' : '#10B981',
    2.5
  );

  ctx.fillStyle = creative.theme.badgeTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + badgeH / 2);
  ctx.textBaseline = 'alphabetic';
}

// Draw cropped image maintaining cover aspect ratio
function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number = 32
) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.clip();

  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let sW = img.width;
  let sH = img.height;
  let sX = 0;
  let sY = 0;

  if (imgRatio > boxRatio) {
    sW = img.height * boxRatio;
    sX = (img.width - sW) / 2;
  } else {
    sH = img.width / boxRatio;
    sY = (img.height - sH) / 2;
  }

  ctx.drawImage(img, sX, sY, sW, sH, x, y, w, h);
  ctx.restore();
}

// ----------------------------------------------------------------------
// 10 ADAPTIVE HIGH-RESOLUTION PRODUCTION LAYOUTS (INFOGRAPHIC INTEGRATED)
// ----------------------------------------------------------------------

// LAYOUT A: Premium Editorial (Large visual / Infographic + bold headline + minimal copy)
async function renderLayoutA(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number,
  visualImg?: HTMLImageElement
) {
  ctx.fillStyle = creative.theme.backgroundColor;
  ctx.fillRect(0, 0, width, height);

  drawHeader(ctx, width, creative, margin);

  const isLandscape = width > height;
  const contentTop = 270;
  const footerH = isLandscape ? 170 : 190;
  const availableH = height - contentTop - footerH;

  // Split calculations
  const leftW = isLandscape ? width * 0.45 : width * 0.48;
  const rightX = leftW + margin + 60;
  const rightW = width - rightX - margin;
  const rightH = availableH - 50;

  // Pre-header Badge
  ctx.fillStyle = '#059669';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(creative.topicBadge, margin, contentTop + 40);

  // Big Headline
  ctx.fillStyle = creative.theme.textColor;
  ctx.font = '900 84px "Plus Jakarta Sans", sans-serif';
  const hLines = wrapText(ctx, creative.headline, leftW);
  let curY = contentTop + 130;
  for (const line of hLines.slice(0, 3)) {
    ctx.fillText(line, margin, curY);
    curY += 98;
  }

  // Supporting Narrative
  curY += 15;
  ctx.fillStyle = creative.theme.mutedTextColor;
  ctx.font = '500 32px "Inter", sans-serif';
  const subLines = wrapText(ctx, creative.subheadline, leftW);
  for (const line of subLines.slice(0, 2)) {
    ctx.fillText(line, margin, curY);
    curY += 46;
  }

  // Concise Benefits
  curY += 35;
  for (const feat of creative.featurePoints.slice(0, 3)) {
    drawRoundedRect(ctx, margin, curY - 32, leftW, 76, 18, creative.theme.cardBgColor, '#E2E8F0', 2);

    ctx.fillStyle = '#10B981';
    ctx.font = '800 30px "Inter", sans-serif';
    ctx.fillText('✓', margin + 28, curY + 16);

    ctx.fillStyle = creative.theme.textColor;
    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(feat, margin + 74, curY + 16);

    curY += 94;
  }

  // Corporate CTA Pill Button
  curY += 20;
  const ctaH = 92;
  drawRoundedRect(ctx, margin, curY, leftW, ctaH, 46, '#0D3B2E');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${creative.ctaText}  →`, margin + leftW / 2, curY + 56);
  ctx.textAlign = 'left';

  // Right Side: Theme-Aware Visual or Procedural Infographic
  if (creative.visualType === 'cash_cycle' && creative.cashCycleNodes) {
    drawWorkingCapitalCashCycle(
      ctx,
      creative.cashCycleNodes,
      rightX + rightW / 2,
      contentTop + rightH / 2,
      Math.min(rightW * 0.42, rightH * 0.42),
      creative.theme.isDarkTheme
    );
  } else if (creative.visualType === 'flowchart' && creative.flowchartSteps) {
    drawFlowchartInfographic(ctx, creative.flowchartSteps, rightX, contentTop + 10, rightW, rightH, creative.theme.isDarkTheme);
  } else if (creative.visualType === 'credit_gauge' && creative.creditGaugeData) {
    drawCreditScoreGauge(ctx, creative.creditGaugeData, rightX, contentTop + 10, rightW, rightH, creative.theme.isDarkTheme);
  } else if (creative.visualType === 'comparison' && creative.comparisonData) {
    drawComparisonGrid(ctx, creative.comparisonData, rightX, contentTop + 10, rightW, rightH, creative.theme.isDarkTheme);
  } else if (creative.visualType === 'hybrid_growth' && visualImg && creative.hybridGrowthData) {
    drawHybridGrowthOverlay(ctx, visualImg, creative.hybridGrowthData, rightX, contentTop + 10, rightW, rightH);
  } else if (visualImg) {
    drawCoverImage(ctx, visualImg, rightX, contentTop + 10, rightW, rightH, 36);

    // Subtle overlay gradient on bottom
    const grad = ctx.createLinearGradient(rightX, contentTop + rightH - 240, rightX, contentTop + rightH);
    grad.addColorStop(0, 'rgba(13, 59, 46, 0)');
    grad.addColorStop(1, 'rgba(13, 59, 46, 0.88)');
    ctx.fillStyle = grad;
    ctx.fillRect(rightX, contentTop + rightH - 240, rightW, 240);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✦ MONEYPLANT ADVANTAGE', rightX + 40, contentTop + rightH - 80);

    ctx.font = '500 22px "Inter", sans-serif';
    ctx.fillStyle = '#34D399';
    ctx.fillText('100+ Lending Institution Network', rightX + 40, contentTop + rightH - 42);

    drawRoundedRect(ctx, rightX, contentTop + 10, rightW, rightH, 36, undefined, 'rgba(16, 185, 129, 0.35)', 3);
  }

  drawBrandFooter(ctx, width, height, creative, margin);
}

// LAYOUT B: Corporate Split (~45% text, 55% visual/infographic)
async function renderLayoutB(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number,
  visualImg?: HTMLImageElement
) {
  await renderLayoutA(ctx, width, height, creative, margin, visualImg);
}

// LAYOUT C: Full-Bleed Cinematic with Gradient Scrim
async function renderLayoutC(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number,
  visualImg?: HTMLImageElement
) {
  if (visualImg) {
    drawCoverImage(ctx, visualImg, 0, 0, width, height, 0);
  } else {
    ctx.fillStyle = '#0A2019';
    ctx.fillRect(0, 0, width, height);
  }

  // Multi-stop cinematic gradient scrim
  const scrim = ctx.createLinearGradient(0, 0, 0, height);
  scrim.addColorStop(0, 'rgba(10, 32, 25, 0.90)');
  scrim.addColorStop(0.35, 'rgba(10, 32, 25, 0.75)');
  scrim.addColorStop(0.70, 'rgba(7, 24, 18, 0.94)');
  scrim.addColorStop(1, 'rgba(5, 18, 14, 0.98)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, width, height);

  // White Logo Header
  drawMoneyPlantLogo(ctx, margin, 75, 2.4, 'white');

  // Category Tag
  const badgeText = creative.categoryLabel.toUpperCase();
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  const badgeW = ctx.measureText(badgeText).width + 60;
  const badgeH = 64;
  const badgeX = width - margin - badgeW;
  drawRoundedRect(ctx, badgeX, 85, badgeW, badgeH, 32, 'rgba(52, 211, 153, 0.22)', '#34D399', 2.5);
  ctx.fillStyle = '#6EE7B7';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgeX + badgeW / 2, 85 + badgeH / 2);
  ctx.textBaseline = 'alphabetic';

  const contentW = width - margin * 2;
  let curY = 320;

  // Topic Badge
  ctx.fillStyle = '#34D399';
  ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`✦  ${creative.topicBadge}`, margin, curY);

  // Giant Headline
  curY += 75;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 88px "Plus Jakarta Sans", sans-serif';
  const hLines = wrapText(ctx, creative.headline, contentW);
  for (const line of hLines.slice(0, 3)) {
    ctx.fillText(line, margin, curY);
    curY += 102;
  }

  // Subheadline
  curY += 20;
  ctx.fillStyle = '#D1FAE5';
  ctx.font = '500 34px "Inter", sans-serif';
  const subLines = wrapText(ctx, creative.subheadline, contentW);
  for (const line of subLines.slice(0, 2)) {
    ctx.fillText(line, margin, curY);
    curY += 50;
  }

  // 3 Frosted Benefit Cards
  curY += 40;
  for (const feat of creative.featurePoints.slice(0, 3)) {
    drawRoundedRect(ctx, margin, curY, contentW, 88, 22, 'rgba(16, 185, 129, 0.15)', 'rgba(52, 211, 153, 0.35)', 2);

    ctx.fillStyle = '#34D399';
    ctx.font = '800 32px "Inter", sans-serif';
    ctx.fillText('✓', margin + 36, curY + 54);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(feat, margin + 88, curY + 54);

    curY += 108;
  }

  // CTA Pill
  curY += 25;
  const ctaW = Math.min(contentW, 680);
  drawRoundedRect(ctx, margin, curY, ctaW, 96, 48, '#10B981');
  ctx.fillStyle = '#062018';
  ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${creative.ctaText}  →`, margin + ctaW / 2, curY + 58);
  ctx.textAlign = 'left';

  drawBrandFooter(ctx, width, height, creative, margin);
}

// LAYOUT D: Premium Product Showcase
async function renderLayoutD(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number,
  visualImg?: HTMLImageElement
) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  drawHeader(ctx, width, creative, margin);

  const isLandscape = width > height;
  const contentTop = 270;
  const footerH = isLandscape ? 170 : 190;
  const availableH = height - contentTop - footerH;

  const leftW = isLandscape ? width * 0.46 : width * 0.5;
  const rightX = leftW + margin + 50;
  const rightW = width - rightX - margin;
  const rightH = availableH - 40;

  // Topic Badge
  ctx.fillStyle = '#059669';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(creative.topicBadge, margin, contentTop + 40);

  // Big Headline
  ctx.fillStyle = '#0D3B2E';
  ctx.font = '900 82px "Plus Jakarta Sans", sans-serif';
  const hLines = wrapText(ctx, creative.headline, leftW);
  let curY = contentTop + 125;
  for (const line of hLines.slice(0, 3)) {
    ctx.fillText(line, margin, curY);
    curY += 96;
  }

  // Subheadline
  curY += 15;
  ctx.fillStyle = '#64748B';
  ctx.font = '500 30px "Inter", sans-serif';
  const subLines = wrapText(ctx, creative.subheadline, leftW);
  for (const line of subLines.slice(0, 2)) {
    ctx.fillText(line, margin, curY);
    curY += 44;
  }

  // Feature Cards
  curY += 35;
  for (const feat of creative.featurePoints.slice(0, 3)) {
    drawRoundedRect(ctx, margin, curY, leftW, 80, 20, '#F8FAFC', '#E2E8F0', 2);
    ctx.fillStyle = '#10B981';
    ctx.font = '800 28px "Inter", sans-serif';
    ctx.fillText('✓', margin + 28, curY + 48);

    ctx.fillStyle = '#0F172A';
    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(feat, margin + 72, curY + 48);
    curY += 100;
  }

  // CTA Pill
  curY += 20;
  drawRoundedRect(ctx, margin, curY, leftW, 92, 46, '#0D3B2E');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${creative.ctaText}  →`, margin + leftW / 2, curY + 56);
  ctx.textAlign = 'left';

  // Right Side Visual Card
  if (visualImg) {
    drawCoverImage(ctx, visualImg, rightX, contentTop + 10, rightW, rightH, 36);

    // Frosted Floating Guarantee Badge
    const floatW = rightW - 80;
    const floatH = 110;
    const floatY = contentTop + rightH - 140;
    drawRoundedRect(ctx, rightX + 40, floatY, floatW, floatH, 24, 'rgba(13, 59, 46, 0.92)', '#10B981', 2.5);

    drawVectorIcon(ctx, 'shield', rightX + 85, floatY + floatH / 2, 48, '#34D399');

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('MONEYPLANT INSTITUTIONAL ADVISORY', rightX + 130, floatY + 44);

    ctx.fillStyle = '#A7F3D0';
    ctx.font = '500 20px "Inter", sans-serif';
    ctx.fillText('Structured financing tailored to your exact profile', rightX + 130, floatY + 76);
  }

  drawBrandFooter(ctx, width, height, creative, margin);
}

// LAYOUT E: Executive Finance (Dark charcoal + deep forest green + gold highlights)
async function renderLayoutE(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number,
  visualImg?: HTMLImageElement
) {
  ctx.fillStyle = '#071A14';
  ctx.fillRect(0, 0, width, height);

  drawHeader(ctx, width, creative, margin);

  const contentTop = 270;
  const isLandscape = width > height;
  const leftW = isLandscape ? width * 0.46 : width * 0.5;
  const rightX = leftW + margin + 60;
  const rightW = width - rightX - margin;
  const rightH = height - contentTop - 240;

  // Gold Badge
  ctx.fillStyle = '#F59E0B';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`✦  ${creative.topicBadge}`, margin, contentTop + 40);

  // Big Headline
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px "Plus Jakarta Sans", sans-serif';
  const hLines = wrapText(ctx, creative.headline, leftW);
  let curY = contentTop + 130;
  for (const line of hLines.slice(0, 3)) {
    ctx.fillText(line, margin, curY);
    curY += 98;
  }

  // Subheadline
  curY += 20;
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 32px "Inter", sans-serif';
  const subLines = wrapText(ctx, creative.subheadline, leftW);
  for (const line of subLines.slice(0, 2)) {
    ctx.fillText(line, margin, curY);
    curY += 46;
  }

  // Feature cards
  curY += 35;
  for (const feat of creative.featurePoints.slice(0, 3)) {
    drawRoundedRect(ctx, margin, curY, leftW, 80, 20, '#0E3025', '#1E4D3E', 2);
    ctx.fillStyle = '#34D399';
    ctx.font = '800 28px "Inter", sans-serif';
    ctx.fillText('✦', margin + 28, curY + 48);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(feat, margin + 72, curY + 48);
    curY += 100;
  }

  // Gold Action Button
  curY += 20;
  drawRoundedRect(ctx, margin, curY, leftW, 92, 46, '#10B981');
  ctx.fillStyle = '#062018';
  ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${creative.ctaText}  →`, margin + leftW / 2, curY + 56);
  ctx.textAlign = 'left';

  // Right Side Visual
  if (visualImg) {
    drawCoverImage(ctx, visualImg, rightX, contentTop + 10, rightW, rightH, 36);
    drawRoundedRect(ctx, rightX, contentTop + 10, rightW, rightH, 36, undefined, 'rgba(52, 211, 153, 0.4)', 3);
  }

  drawBrandFooter(ctx, width, height, creative, margin);
}

// LAYOUT F: Clean Financial (Pure white + forest-green typography + structured cards)
async function renderLayoutF(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number,
  visualImg?: HTMLImageElement
) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  drawHeader(ctx, width, creative, margin);

  const contentTop = 270;
  const isLandscape = width > height;
  const contentW = width - margin * 2;

  // Check if topic is a comparison
  if (creative.visualType === 'comparison' && creative.comparisonData) {
    // Topic Badge
    ctx.fillStyle = '#059669';
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(creative.topicBadge, margin, contentTop + 40);

    // Headline
    ctx.fillStyle = '#0D3B2E';
    ctx.font = '900 76px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(creative.headline, margin, contentTop + 120);

    // Comparison Grid
    const gridY = contentTop + 160;
    const gridH = height - gridY - 260;
    drawComparisonGrid(ctx, creative.comparisonData, margin, gridY, contentW, gridH, false);

    drawBrandFooter(ctx, width, height, creative, margin);
    return;
  }

  // Standard Clean Financial Layout
  await renderLayoutA(ctx, width, height, creative, margin, visualImg);
}

// LAYOUT G: Educational & Procedural Infographics (Flowchart, Cash Cycle, Credit Gauge, Benefit Tree)
async function renderLayoutG(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number
) {
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, width, height);

  drawHeader(ctx, width, creative, margin);

  const contentW = width - margin * 2;
  const isLandscape = width > height;
  let curY = 270;

  // Educational Pre-header Badge
  ctx.fillStyle = '#059669';
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(creative.topicBadge, margin, curY + 36);

  // Main Question / Headline
  curY += 105;
  ctx.fillStyle = '#0D3B2E';
  ctx.font = '900 76px "Plus Jakarta Sans", sans-serif';
  const hLines = wrapText(ctx, creative.headline, contentW);
  for (const line of hLines.slice(0, 2)) {
    ctx.fillText(line, margin, curY);
    curY += 92;
  }

  // Subheadline
  curY += 12;
  ctx.fillStyle = '#475569';
  ctx.font = '500 30px "Inter", sans-serif';
  const subLines = wrapText(ctx, creative.subheadline, contentW);
  for (const line of subLines.slice(0, 2)) {
    ctx.fillText(line, margin, curY);
    curY += 44;
  }

  curY += 28;
  const infoH = height - curY - 240;

  // Procedural Infographic Routing
  if (creative.visualType === 'cash_cycle' && creative.cashCycleNodes) {
    drawWorkingCapitalCashCycle(
      ctx,
      creative.cashCycleNodes,
      margin + contentW / 2,
      curY + infoH / 2,
      Math.min(contentW * 0.34, infoH * 0.44),
      false
    );
  } else if (creative.visualType === 'flowchart' && creative.flowchartSteps) {
    drawFlowchartInfographic(ctx, creative.flowchartSteps, margin, curY, contentW, infoH, false);
  } else if (creative.visualType === 'credit_gauge' && creative.creditGaugeData) {
    drawCreditScoreGauge(ctx, creative.creditGaugeData, margin, curY, contentW, infoH, false);
  } else if (creative.visualType === 'comparison' && creative.comparisonData) {
    drawComparisonGrid(ctx, creative.comparisonData, margin, curY, contentW, infoH, false);
  } else {
    // Default 3-Card Educational Breakdown
    const cardH = 135;
    const cardGap = 26;

    creative.featurePoints.slice(0, 3).forEach((point, idx) => {
      const cardY = curY + idx * (cardH + cardGap);
      drawRoundedRect(ctx, margin, cardY, contentW, cardH, 24, '#FFFFFF', '#E2E8F0', 2.5);

      // Number circle badge
      const circleX = margin + 60;
      const circleY = cardY + cardH / 2;
      ctx.beginPath();
      ctx.arc(circleX, circleY, 34, 0, Math.PI * 2);
      ctx.fillStyle = '#E6F4EA';
      ctx.fill();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#0D3B2E';
      ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`0${idx + 1}`, circleX, circleY);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';

      // Point Content
      ctx.fillStyle = '#0F172A';
      ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(point.replace(/^\d+[\s•\-]+/, ''), margin + 120, cardY + 58);

      ctx.fillStyle = '#64748B';
      ctx.font = '500 22px "Inter", sans-serif';
      ctx.fillText('Key factor evaluated by leading institutional lenders.', margin + 120, cardY + 98);
    });

    // MoneyPlant Advisory Box
    const tipY = curY + 3 * (cardH + cardGap) + 30;
    drawRoundedRect(ctx, margin, tipY, contentW, 90, 20, '#ECFDF5', '#A7F3D0', 2.5);
    ctx.fillStyle = '#059669';
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('💡 MONEYPLANT ADVISORY NOTE:', margin + 35, tipY + 54);

    ctx.fillStyle = '#065F46';
    ctx.font = '600 23px "Inter", sans-serif';
    ctx.fillText('Maintaining timely repayments safeguards your long-term borrowing freedom.', margin + 450, tipY + 54);
  }

  drawBrandFooter(ctx, width, height, creative, margin);
}

// LAYOUT H: Festive Corporate (Elegant festival imagery preserving MoneyPlant's identity)
async function renderLayoutH(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number,
  visualImg?: HTMLImageElement
) {
  if (visualImg) {
    drawCoverImage(ctx, visualImg, 0, 0, width, height, 0);
  } else {
    ctx.fillStyle = '#081D17';
    ctx.fillRect(0, 0, width, height);
  }

  // Warm Festive Scrim
  const scrim = ctx.createLinearGradient(0, 0, 0, height);
  scrim.addColorStop(0, 'rgba(8, 29, 23, 0.88)');
  scrim.addColorStop(0.4, 'rgba(8, 29, 23, 0.72)');
  scrim.addColorStop(0.75, 'rgba(6, 20, 16, 0.94)');
  scrim.addColorStop(1, 'rgba(4, 15, 12, 0.98)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, width, height);

  drawMoneyPlantLogo(ctx, margin, 75, 2.4, 'white');

  // Festive Gold Badge
  const badgeText = creative.categoryLabel.toUpperCase();
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  const badgeW = ctx.measureText(badgeText).width + 60;
  const badgeH = 64;
  const badgeX = width - margin - badgeW;
  drawRoundedRect(ctx, badgeX, 85, badgeW, badgeH, 32, 'rgba(245, 158, 11, 0.22)', '#F59E0B', 2.5);
  ctx.fillStyle = '#FCD34D';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgeX + badgeW / 2, 85 + badgeH / 2);
  ctx.textBaseline = 'alphabetic';

  const contentW = width - margin * 2;
  let curY = 320;

  ctx.fillStyle = '#FBBF24';
  ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`✦  ${creative.topicBadge}`, margin, curY);

  curY += 75;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 88px "Plus Jakarta Sans", sans-serif';
  const hLines = wrapText(ctx, creative.headline, contentW);
  for (const line of hLines.slice(0, 3)) {
    ctx.fillText(line, margin, curY);
    curY += 102;
  }

  curY += 20;
  ctx.fillStyle = '#D1FAE5';
  ctx.font = '500 34px "Inter", sans-serif';
  const subLines = wrapText(ctx, creative.subheadline, contentW);
  for (const line of subLines.slice(0, 2)) {
    ctx.fillText(line, margin, curY);
    curY += 50;
  }

  // 3 Festive Wishes Cards
  curY += 40;
  for (const feat of creative.featurePoints.slice(0, 3)) {
    drawRoundedRect(ctx, margin, curY, contentW, 88, 22, 'rgba(14, 48, 37, 0.85)', 'rgba(245, 158, 11, 0.35)', 2);

    ctx.fillStyle = '#F59E0B';
    ctx.font = '800 32px "Inter", sans-serif';
    ctx.fillText('✦', margin + 36, curY + 54);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(feat, margin + 88, curY + 54);

    curY += 108;
  }

  // Gold CTA
  curY += 25;
  const ctaW = Math.min(contentW, 680);
  drawRoundedRect(ctx, margin, curY, ctaW, 96, 48, '#F59E0B');
  ctx.fillStyle = '#071A14';
  ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${creative.ctaText}  →`, margin + ctaW / 2, curY + 58);
  ctx.textAlign = 'left';

  drawBrandFooter(ctx, width, height, creative, margin);
}

// LAYOUT I: Corporate Announcement
async function renderLayoutI(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number
) {
  ctx.fillStyle = '#0A2019';
  ctx.fillRect(0, 0, width, height);

  drawMoneyPlantLogo(ctx, margin, 75, 2.4, 'white');

  const contentW = width - margin * 2;
  let curY = 320;

  // Announcement pill
  drawRoundedRect(ctx, margin, curY, 360, 52, 26, 'rgba(16, 185, 129, 0.25)', '#34D399', 2);
  ctx.fillStyle = '#6EE7B7';
  ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`📢  ${creative.topicBadge}`, margin + 28, curY + 34);

  curY += 100;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 86px "Plus Jakarta Sans", sans-serif';
  const hLines = wrapText(ctx, creative.headline, contentW);
  for (const line of hLines.slice(0, 3)) {
    ctx.fillText(line, margin, curY);
    curY += 100;
  }

  curY += 20;
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 34px "Inter", sans-serif';
  const subLines = wrapText(ctx, creative.subheadline, contentW);
  for (const line of subLines.slice(0, 2)) {
    ctx.fillText(line, margin, curY);
    curY += 50;
  }

  // 3 Milestone Announcement Cards
  curY += 40;
  for (const feat of creative.featurePoints.slice(0, 3)) {
    drawRoundedRect(ctx, margin, curY, contentW, 96, 24, '#123327', 'rgba(52, 211, 153, 0.3)', 2);

    ctx.fillStyle = '#34D399';
    ctx.font = '800 32px "Inter", sans-serif';
    ctx.fillText('★', margin + 36, curY + 58);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(feat, margin + 88, curY + 58);

    curY += 120;
  }

  // CTA Pill
  curY += 20;
  drawRoundedRect(ctx, margin, curY, 640, 96, 48, '#10B981');
  ctx.fillStyle = '#062018';
  ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${creative.ctaText}  →`, margin + 320, curY + 58);
  ctx.textAlign = 'left';

  drawBrandFooter(ctx, width, height, creative, margin);
}

// LAYOUT J: Service Showcase
async function renderLayoutJ(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  creative: GeneratedCreative,
  margin: number,
  visualImg?: HTMLImageElement
) {
  await renderLayoutD(ctx, width, height, creative, margin, visualImg);
}

// -------------------------------------------------------------------------------------
// MAIN PRODUCTION EXPORT & RENDERING PIPELINE
// -------------------------------------------------------------------------------------

export async function renderPoster(
  canvas: HTMLCanvasElement,
  creative: GeneratedCreative,
  dimensions?: PosterDimensions
) {
  const dim = dimensions || creative.dimensions;

  // Determine exact high-resolution canvas buffer dimensions
  let width = 2160;
  let height = 2160;

  if (dim === '2160x2700' || dim === '1080x1350') {
    width = 2160;
    height = 2700;
  } else if (dim === '3840x2160') {
    width = 3840;
    height = 2160;
  } else {
    width = 2160;
    height = 2160;
  }

  // Set the canvas production resolution
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // High-precision smooth vector rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Safe margin system: 80–100px for square/portrait; 100–140px for landscape
  const margin = width > height ? 120 : 96;

  // Load high-resolution visual
  let visualImg: HTMLImageElement | undefined;
  if (creative.imageUrl) {
    try {
      visualImg = await loadImage(creative.imageUrl);
    } catch (e) {
      console.warn('Could not load remote image, using procedural composition:', e);
    }
  }

  // Dispatch layout with procedural infographic intelligence
  switch (creative.layout) {
    case 'layout_h_festive_corporate':
    case 'layout_f_festival':
      await renderLayoutH(ctx, width, height, creative, margin, visualImg);
      break;
    case 'layout_g_educational':
    case 'layout_e_infographic':
      await renderLayoutG(ctx, width, height, creative, margin);
      break;
    case 'layout_i_announcement':
    case 'layout_g_announcement':
      await renderLayoutI(ctx, width, height, creative, margin);
      break;
    case 'layout_c_cinematic_scrim':
      await renderLayoutC(ctx, width, height, creative, margin, visualImg);
      break;
    case 'layout_d_product_showcase':
    case 'layout_d_bold_headline':
      await renderLayoutD(ctx, width, height, creative, margin, visualImg);
      break;
    case 'layout_e_executive_finance':
      await renderLayoutE(ctx, width, height, creative, margin, visualImg);
      break;
    case 'layout_f_clean_financial':
      await renderLayoutF(ctx, width, height, creative, margin, visualImg);
      break;
    case 'layout_j_service_showcase':
      await renderLayoutJ(ctx, width, height, creative, margin, visualImg);
      break;
    case 'layout_b_corporate_split':
    case 'layout_b_card_hero':
      await renderLayoutB(ctx, width, height, creative, margin, visualImg);
      break;
    case 'layout_a_editorial':
    case 'layout_a_editorial_split':
    default:
      await renderLayoutA(ctx, width, height, creative, margin, visualImg);
      break;
  }
}

// Download canvas as Ultra-High-Resolution Lossless PNG
export function downloadPoster(canvas: HTMLCanvasElement, topic: string) {
  const cleanTopic = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const resLabel = `${canvas.width}x${canvas.height}`;
  const filename = `moneyplant-${cleanTopic || 'creative'}-${resLabel}-${Date.now()}.png`;

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}

// Copy high-resolution canvas image to clipboard
export async function copyPosterToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        resolve(true);
      } catch (err) {
        console.error('Failed to copy poster image to clipboard:', err);
        resolve(false);
      }
    }, 'image/png');
  });
}

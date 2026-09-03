import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The portrait compositions used across the site.
 *
 * Each one layers three things: a brand-coloured ground, a cut-out portrait
 * that breaks out over the top of it, and small status cards that float at
 * the edges. The portraits are decorative — every claim on the page is made
 * in real text beside them — so they carry an empty alt and the cards are
 * hidden from assistive technology.
 *
 * Card positions are percentages of the frame, so the whole composition
 * scales smoothly from 320px to desktop without a separate mobile layout.
 */

export const portraits = {
  standing: {
    src: "/imagery/advisor-standing.webp",
    width: 900,
    height: 1302,
    blurDataURL:
      "data:image/webp;base64,UklGRqgBAABXRUJQVlA4WAoAAAAQAAAADwAAFgAAQUxQSOQAAAANgGRbmyHpi8iKynLbtm1b6+vd9NwacWTb6fwzS7GGiJgAAKJkfq3qaf1AJ6SL/Kmqz/94+8a97QFQEmPlhktqV9HmuwNw0TKgEaDkLH1uai64qNYdAEyUje7ckYfc8ncCAK7UFJxoJAq9D2IAwHNGzu8dHlE1DxnU1viRES7+t4ilgeU0XX6KhO14yKRW2e85Vd+ELIHKYd0TlA0sZ6YjSoaXDYFIrO3PloHC8zQb0qSxIGcSZP0U2x6ye/RT/udCxnkc+JAzLroNkqHP43LXk3CtU+8/zCW8n52c0/ogzwbnLwpWUDggngAAADAEAJ0BKhAAFwA+wU6hSqekIyGwCADwGAlkAJ0ygAKOg/x3njsZHushAAD+6YxyEhI1ddmMTfbyNZ934wFSgAcpSkyjWTMnkcFnSwVTpJ2Mjev6mYBI4NNXL1aI4uSWx9i2N1twa+wbzVns1PUo5MQGmQNg/sRE4itmMwF2sfyKrbjDX7ROfAzHYe5yNzw5Gg85smF8enDnqcRAAAAA",
  },
  explaining: {
    src: "/imagery/advisor-explaining.webp",
    width: 900,
    height: 1219,
    blurDataURL:
      "data:image/webp;base64,UklGRrgBAABXRUJQVlA4WAoAAAAQAAAADwAAFQAAQUxQSAoBAAANgF1tmyHpq66x7bXtvdtbI5FNYPPYYGzbtm22qmqZQ0RMAAAabWu19HXsqgK/qTEv9qkWenqf2R/EVf2gEV/l7iHjAAi3p8ocUjBj6eMXJLOkCBBL2r4MAMRWeqQDADNAAJCsOU8MENRkfWMcAH9zEAKDsTRv5ELmhIaNrxwADdakjy19GlLqrxkAEOotjXXe2YsNKv422rLUbXvWg/4PqCtr0xT+4P/BknrqMin/CWGOs4TM8O/HTXKspPRS142/hP66XxCuqH1jAn8Smv2hxQtkhRsJAAKj4125mYoxU4hKAJMnNyoMa+3OylYdAAR7mB/SfXuPzQr7JVkyN9cFFc64Kv6gIemccVZQOCCIAAAAcAQAnQEqEAAWAD7BTqFKp6QjIbAIAPAYCUATpBAQXDHdHFoE0N2z4uqNLgAA/vNAUI7cX9+7wmr7h/F/qNczxOK8+DgGVNIjx/6zB9fCWPrFh35NBIMf/G3fqb4l8+HlhoCaSZVLQAZeX493jU7YYeRW1UOVPlluu2ieSui01Qbyp29LBSQAAA==",
  },
  partner: {
    src: "/imagery/advisor-partner.webp",
    width: 900,
    height: 1357,
    blurDataURL:
      "data:image/webp;base64,UklGRvoBAABXRUJQVlA4WAoAAAAQAAAADwAAFwAAQUxQSBkBAAANgGNbmyLl+6tqcHd3d3eHjDWwCdZERkbExLi7u7tLd8+UoL2GiJgAgAITiptaFobOLAkAFJjbG3/1mpW0MvtpALCIfp+jdVRdgvdSGhDFZH8qgEJC3z9gQDxGSwDEAgPfpQFRoFIAoH1cEKDlPYvmAsZ3r38ZczlbmRwE3+5RLAMA/eo97Cv3PIwkBwCAMMz+jPWRfA0K4NogLjolO+FFq5iug6t3W2EwR91aChTc3f60uXDrH7Ck1ABESHZx1tHoR7A0hN+cBcUULt35Awz+Ji6Sgw7h2oTn71mBzAULKTl9imDkQmQnH6QGugCiW6bLwuCSBxSOZaRy+k+zwLOzyiD+j5LWHTMG/6rnravz7FTH/KXlwbCIBABWUDggugAAADAEAJ0BKhAAGAA+wU6gSqekIyGwCADwGAlAE6QJiEUdkwAPf1wEjdLwAAD0aQlsfPm357xZBSG/75EG3lvvx//ruoziBtBfplh8Gw8ZToKN8804uzUsGfhGTpY5JY6HnrnhVqKGD/Q8qm6et7HOxz8pTx6pG1O+xUH2wlVo2T+4zQcBElWuZQ9CnVuiAkXbbUjUAnHbIX4OOcKaY8DMNsJj3Vq3aDB/U+BdZRiZDCrmdIJnZa5ldDYAAA==",
  },
  manager: {
    src: "/imagery/advisor-manager.webp",
    width: 900,
    height: 1230,
    blurDataURL:
      "data:image/webp;base64,UklGRsQBAABXRUJQVlA4WAoAAAAQAAAADwAAFQAAQUxQSP0AAAANgKRt27Hlfvlb2bbtttC0YaOmraZlNOpoAbZt28b3vx/C939riIgJAMBTe7vlQP+FDlsmyjO/VM3DmjJsiCvnIYrEnK038x8xA0VvpsniHzViwVbnsMx3tzABwCIv0y1BqPtEgf+EeePuFHk+jHBmAJwlVvmipuWrjl6/vuuI5HZSDaDxXRXWytCj0VN4qywAIhDJzNpf1vo+FGw5WHLt+GOSidhcFj9dKumAILFw/cVPSQwwb/vxdTx3QEROxV6WdADqbxqujsApjx/3F0sWwzS1z/OpzmRiZ7xdXh597cUnE/bP0BYGEW8FuLLwn3DvJuXurHsdtpQlkysFAFZQOCCgAAAAcAQAnQEqEAAWAD7BTqBKp6QjIbAIAPAYCWMAnQGMnu33nTjammf/ltXVF2AA/t0aPxMLO2EpAsunz3Q9UfhFJek6+TldPglRFP1DJ5rq3TJ1EVcAlF75eJ/B0Vj96PJpODy2MdmjmWujayPE4/7cSSOT3oIfJJ87TzZAXZ/D3Ol/9+/XhAhB/xuL5XoSccmampA6cGYSfJPTpnkBmhAAAA==",
  },
  consultant: {
    src: "/imagery/advisor-consultant.webp",
    width: 900,
    height: 1298,
    blurDataURL:
      "data:image/webp;base64,UklGRvABAABXRUJQVlA4WAoAAAAQAAAADwAAFgAAQUxQSAwBAAABj8OgkSRF3z3HD/79ooWIyI0vjQICiElPuJ2tGyumXs1mhQRGRam0Ct0mikl4C8pPQm3bNmzINZMT0f/Y+zTIjm3btK0xtve1rfxTul/me8dYmnN7xxAREwCwuHs6nry+byv0xnkZSeyM1R7KTq6m5GY9kBBaRfQb0Q4YaQXalRd0VbZSZFzMHfrjjU/TsDaCCgCTeFesTRjgA4Biby8NzB79ygNOcLO3nwMsUSUZVmu5T2MCIIBEJr+riwqDZJi+/B1yCAjL53fVMerfX6dGR0D/ffxfyCgz+ZtINYLJwf+vpQ6p6nrxfyJVn2zXgc6EATW/m6pkt29jbBzTLK10KgaJiCrJYnaIXVoHVlA4IL4AAABwBACdASoQABcAPsFOoEqnpCMhsAgA8BgJbACdMoMrgYAAIGllXRZBda1kkAD+pr3LVtxZ1r8TbGeIIObbVZDC9aQeaUDxRn4XFSqvo4LcTg2yMua/Li34+XrhzcUxs3/FLjrPkbqhu32DUpuruSpy1fyLvjgRiOaYcLU5gSkiSg6K8UlJFYvcDdjvZHeZDVKwNstpli4lQRzzTD4rel2mlIcgSMzEGtVnB52AmtBCAb8ZHtUT05StrwfLbcAA",
  },
  principal: {
    src: "/imagery/advisor-principal.webp",
    width: 900,
    height: 1182,
    blurDataURL:
      "data:image/webp;base64,UklGRsABAABXRUJQVlA4WAoAAAAQAAAADwAAFAAAQUxQSP8AAAANgFxte2Llj4xcN9xdVu4uO2+AHuiGre8oggrc3d2dZGaSILnUEBETAABmztgIm524FqAlVq2fWfV7e67QYJLz7KBE8NxVGuU9pBhAgm8CtNI9i8ewcxclSeThRUPAe4lQJBQAGBJdxGm87+LkjbkAZiininFl93Sy7ZU9TrP6S64cABzIKC/z5m4ClYWfngIAgqxg/uuhXXbrgBZhFM7ftXPfhQ4AWcUncZvL/+R/VjxJlcyj6aXt964wNdJ7iGQ09X7xL4v+Qcj2UInFkSVAQ8LO4+l4a1xlUgx/xdPC4sxmfDQdoT/yc34v8HiEulwFf4U49psSpYIALTKzzxwAVlA4IJoAAAAQBACdASoQABUAPsFOoUqnpCMhsAgA8BgJYwCdABarkwra+dB2e1+vQAD+5qSabRQ9ts304zTz2OXHnEQaSeKZJsvJojU7+AtARDl18MX90FB0TO+B0BQ6nHWLibruu8IfEvDpMZGEVRC2DXpj3axIFVMJY9ArXwtb8Ih0kUYbCMCRA80kVzTYxbIAQJJjK+MFRLi1maB0AAAA",
  },
  lead: {
    src: "/imagery/advisor-lead.webp",
    width: 900,
    height: 1404,
    blurDataURL:
      "data:image/webp;base64,UklGRtYBAABXRUJQVlA4WAoAAAAQAAAADwAAGAAAQUxQSBABAAANgGNt2zHn+f5vPBPbtm2nT52Ka8oSsgk75Zx0Y9uKf3zFjzVExAQAnGXlZMV1+f4lQU703YfJ3/bZZ98/k1HbVu6fmcd6bgsiAEJaJ34kUOtiysNLADWM5gWA6JoXX/MMgGW6IACg5tl4RJQAnelXBADOZs0KDDor/8MAMML/2ADU7EQFyJmu5a8oorWhJMoIbTwuX6f/Lnw8k4HoO1b/b7+PfhmUib5p7iNWLaiBo511DhODVuuQj0IrZ+rL8HpNtKutbKFEDahb9nQbtHDGodcZK6cBzHI/2sIRFSb+hp2pBTNVYt+JQKhon6tjRCaJgSu+xtieEgjkHGq+4/qeyS8JqnUz9tJeUoQq1Q8nc1ZQOCCgAAAA0AMAnQEqEAAZAD7BUKFKp6SjIbAIAPAYCUAToALLpQsEz6T+2YAAAP7xQRRtw8N1WFBXc/6MleS14ZqdMU6JRbaKkVDj56/dVQ+bQVgBSrHvpddthdSMaATvqc9qDzEBr+jtt1/1VTEGTytE1PLmlY6oAzOPVuYDO90rVbYRydyCmAp7FrokA92EnsI19pBx0vj1qb4zJlABftcdZxAAAA==",
  },
  associate: {
    src: "/imagery/advisor-associate.webp",
    width: 900,
    height: 1433,
    blurDataURL:
      "data:image/webp;base64,UklGRvgBAABXRUJQVlA4WAoAAAAQAAAADwAAGAAAQUxQSCMBAAANkGXb1vFY+5wvTsq2bTzZ6Ev1pXpjvNq2bd77+4vThoiYAADs6xotXh/b1f0IJ87uf1MK8+dfrQjCWWPqfl/rz7ZqhZG74sOELbV14cMfJr15igS7yt6fpASYU+2mH4SEvGvF9IOET7MAcHzP1c0/HX6y/xNMYGftyNPSGSit+9MCAPKV1eszQuQnGojI9sTiR3LmvEaBsKVmC5H6ZkYB3FkeiH8yBnKNfJx+R5Owe5v6r3V/BL/UyJu5nVlmIJJfY2/ezOVgqssRxsInv+6/jtcK2hKYAIB/thaN/1sVOSYDgCVPphIJieWKRDjD/U7C3fJgIiL504v2OL3xv4wE9jbts1AER7H+u7363cxIriAAfutx/Nsj1QtHgZ0BSP303EUAVlA4IK4AAABwBACdASoQABkAPsFOoEqnpCMhsAgA8BgJZACdMoACbnDarSmJD1l75KbqAAD+8zw23vWyFNdOhp4AFyqMwDpWpLjj/3Gu9+BXtsbwY4XkqTWX7SEh0hgBfta0Z2zAP8u8kSgmiOwAfXv+E1+ckyDWCTQ/9Y1M8yLofiPARn66Y4hRa3kajumYC60f4K13VbXDoStMRdcGfoJw1CogmlQHdr6b2dMZud/HHbKgAAA=",
  },
  analyst: {
    src: "/imagery/advisor-analyst.webp",
    width: 900,
    height: 1402,
    blurDataURL:
      "data:image/webp;base64,UklGRgICAABXRUJQVlA4WAoAAAAQAAAADwAAGAAAQUxQSCcBAAANkFxb27Fn1/18/r7Ytm07GSYjF5M20kUasK2RbfPnqweDDzVExAQAsEcNjKXPTVybCv7MVV75oxdHzX2IQFHtX5aKbXnf1QUAZsuLNhTs8bWbXwE8eS8cYO5c74EmAWIegwNkS+6be4KEZKbNBgDO6P9muJ3sCRn/FQBCZIHR53NEl75x+Nui+2OvLsPbI/+rAOTKTH2edmdqHEEddu1XfJImgxFBtrwJhKjIM/hbhkKOxHKDEwVRpLyn8Q6XM5Bmevj9eFZ4XbqDAGV9bRbr79v74d2JxAAwPrfkjOCi2uQAQCoieVIxFlP3R/iB3FlnJnyV/zgCMkfy30/EN/yWgQgJ8ReWfI90B4LyFJ1pD1N1RQ7mJ/49WNE28f4r0+knjO21eDsAAFZQOCC0AAAAMAQAnQEqEAAZAD7BTqBKp6QjIbAIAPAYCWIAnQAXEFVePYtN758bT0mQAP7vb1Ufv7bozqjj8zLR8FWh15+6rxyEQG3tGrcsVhaKDa/V48KX4Lml9cfnmME9Urlzq+A+hL4iO2WBd7kzaN/2IsIk+U5fO676WoL+uMalvzsFtYh46n02nL+afgHMC2ItM9HZgMietlv3aN69L1ob9e6V24N2b4lfbH/1dO3glIfNOHNdBlgA",
  },
  specialist: {
    src: "/imagery/advisor-specialist.webp",
    width: 900,
    height: 1401,
    blurDataURL:
      "data:image/webp;base64,UklGRgACAABXRUJQVlA4WAoAAAAQAAAADwAAGAAAQUxQSB4BAAANgFzb2rHnvvhj27btUVpIB1kpKStdpAINnZFt8/uNVz8+1BAREwCA5s0vj7+tbfgN7IQ3L34nyqb2b4Sxsfy5P5HMau/f/raRZNVQxIDljfqvhQZoVpNQAFhpz6WlAcLLApIALHdWHArDkyqW5UsSEFZZ9iBIaZJ2WxoAkr6irBqywu5iMmljOWNjzVjoKI3CkfC6Yev4dqga7r6s0GMkj3sgJImdnlIQFwDsoyiPwCMryTbKEJck43VUmSR8TiZJzMtrTaKyiBMAKugTF5/r8YUZ2HXi5DtpibfwUtTYwNiqlcuyB/8U7IzXB+45rRyLaAckC+ofVG5/WMGZ5nXcBbMbPzywtr//yFFdK6UOJoYyKe//h3McTOzwuIwCVlA4ILwAAACQBACdASoQABkAPsFOoEqnpCMhsAgA8BgJYgCdMoADgdJXCu360+DB2YgIJPAA/vFBEJhw4gEbDG17llaRIa8PLdUUbkgU18VQyPx7jgWfY4a/M/WdT9NnJPVhbv5nRuIDvRaoOylEzb/+6jyFJ/ibGaXNlDhu5CQwc0RZrdRbJkg3seRGvjspT8ITpEHte3cAa4dxMrs5f0P+D3+Wfov8+77D9r//S7qvf4ii4ezaK3m6XrJWpA1rLl/AAA==",
  },
  adviser: {
    src: "/imagery/advisor-adviser.webp",
    width: 900,
    height: 1132,
    blurDataURL:
      "data:image/webp;base64,UklGRtQBAABXRUJQVlA4WAoAAAAQAAAADwAAEwAAQUxQSAgBAAANgFzb2rHnvh9+xLZtO5mZHbCOdJIS0gDHxvS3bcV4EXxFRMQEQJOoLQcr4aPLZ64lVa+9vZZPXJk+NWT9SOUHVzp7L1IaxNiTpJD1A89ODaEYPhkgF1YFiAwmCKMKIYCifuQreGOktPiFA5CKn8caVZuLDD1RAJKhK+HWdW5b4w0ZDbm5IuJNzR6GY58CAFhJP/vKOnc2X78A4CPeNgDKwvaZ789KlYgXb08bQHMnTmViwSh/PykGAPhOmQyL34KDdzjNAMB5dfu3gFyXO/b8I1LFKwOEMN0U/ZMMgykKQmRjWAFARHnbB+cE4l0nA5DUpi9Ks/m6j0ilCoDoW6JfT49DFTRRrABWUDggpgAAADAEAJ0BKhAAFAA+wU6gSqekIyGwCADwGAlsAKwgiMHG1fUjgUCRtRvxIAD+40+oidv8+cfQam/MbOuH7cm321Gk9mtIDX1qd/q49IRJ1WZdnsyIFhm8hTfgnFbhsb5F8TSFScwhPEbKIvDOm98eLWl04VPBdP5fOnrV2fTvv+K9ivR4sb+an6gNqFp+C+wW7+Jyp/3X/7pHHYd6HLVQzYou5nVwAAA=",
  },
  director: {
    src: "/imagery/advisor-director.webp",
    width: 900,
    height: 1320,
    blurDataURL:
      "data:image/webp;base64,UklGRsYBAABXRUJQVlA4WAoAAAAQAAAADwAAFgAAQUxQSA0BAAANgFvbtmpln3vvw93d3d2dHsjoiCo0Y5ARWgFO5u7u8K4c5P1fQ0RMAICI/PExnp89+Gb8l/EjkV/UGb9w4/8jkd3yYUVai1p8swBEdN2NAVRa18YxM0CRJQ8WECojef/LARC+YgIQW7HzDhDHZL05APzlx3kOTC/b5akS/L1/mqgAihBbrsgTTKY16upSRzeP0pMFRGRrf9bV5GVSF387AJBR0fHZt0cJuW8WgVLYxIK9cmMQWsSU7pdd23BU3kvKq6FQJNIS0x4dwuT44uxnY1UIJyIr6nx2CGSnRUJ5wjfJIBCD1VxrerQIIPL885UJGqnxxD+wOV19vbhuASPQur2NaFX8aRAsZfqpAwBWUDggkgAAAPADAJ0BKhAAFwA+wU6gSqekIyGwCADwGAljALDtjESCYqLrHsBtjHQA/umc3NHlb+zARP/CFRuy8VsJNeG0QQQeVhB0Fjziekpbw5kFpIm2Ol8s1nzlhYI1kFJoHkgXBnPtoJJx6nqWe3BIItuLeFU+DOvS5fQP2Igh5CoiSpcyGl+//oFO1/I0jGLF5gKbSoAA",
  },
  managerTwo: {
    src: "/imagery/advisor-manager-2.webp",
    width: 900,
    height: 1208,
    blurDataURL:
      "data:image/webp;base64,UklGRrQBAABXRUJQVlA4WAoAAAAQAAAADwAAFAAAQUxQSAkBAAANgFzb2rHned/vt23bGAYjJyWkgMxTQ7pIDWnCtm3bv74Xwff3EBETAACCa3BAtzQy+c3gP5ZFE9VGyDZVaYLMVOQaw0MDJBl7Mqm5oKlQxP9x+lD3yNmTTcZAAr3MtOnFC7cKGANAMi5/VKnkceG+UhUZyI2+sq7GlW1d9GR7rSr39sfuGgBY64pF1KOXmmSkSjgAYCxXO1SHyti9CJIII01m2xD6plIAWBW/c6hE3gywx5K/owxJ0YrCmul4F0VB9o/W9s3xfHtDRCDJ6U0lEb/S4QeHFiMAJFiv4Ws4bpW3qBAACKqk8nFrbJ4P6ck/EEyKi5lqVch+UpBEcHXFmcZWZ1K8fqkHAFZQOCCEAAAAEAQAnQEqEAAVAD7BTqBKp6QjIbAIAPAYCUAToAQKVwJ2Sr8EmFOTSwAA/u0VQvyQvnEATs9A4Fs5uk1RtG4dE5n/mDYYsm5aTlIDzPMFgFgVe2tTiNBUMRzaDuohxfZu/YeYNDW5OPoq8A8NdjlDEKPZgult1JgV5D+E9ic2ETkIDygA",
  },
} as const;

export type PortraitName = keyof typeof portraits;

export function PortraitScene({
  portrait,
  tone = "violet",
  cards,
  className,
  priority = false,
  frame = "standard",
  sizes = "(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 90vw",
}: {
  portrait: PortraitName;
  tone?: "violet" | "gold" | "lilac";
  /** Floating status cards, positioned with the `at` prop. */
  cards?: ReactNode;
  className?: string;
  priority?: boolean;
  /**
   * Frame proportion. "standard" (4:5) is the card-sized version used beside
   * body copy; "tall" (3:4) is for the home hero, where the composition has a
   * full column of text to stand against and a squat frame leaves a hole
   * under it.
   */
  frame?: "standard" | "tall";
  /**
   * The rendered width of the portrait, as a `sizes` list. Getting this right
   * matters: with the old blanket value a 304px slot was fetching the 1080px
   * source. Pass the column width the portrait actually occupies.
   */
  sizes?: string;
}) {
  const image = portraits[portrait];

  return (
    <div className={cn("relative mx-auto w-full max-w-[26rem] lg:max-w-none", className)}>
      {/* A fixed frame ratio keeps the composition stable at every width. */}
      <div className={cn("relative", frame === "tall" ? "aspect-[3/4]" : "aspect-[4/5]")}>
        {/* Coloured ground the portrait stands on */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-[7%] bottom-0 top-[14%] rounded-[1.75rem] sm:rounded-[2.25rem]",
            tone === "gold" &&
              "bg-[linear-gradient(150deg,var(--color-gold-300),var(--color-gold-100))]",
            tone === "lilac" &&
              "bg-[linear-gradient(150deg,var(--color-purple-200),var(--color-purple-50))]",
            tone === "violet" &&
              "bg-[linear-gradient(150deg,var(--color-purple-700),var(--color-purple-900))]",
          )}
        />
        {/* Soft halo behind the head, so the cut-out never floats unsupported */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-[4%] size-[62%] -translate-x-1/2 rounded-full",
            tone === "gold"
              ? "bg-[radial-gradient(circle,var(--color-gold-100),transparent_70%)]"
              : "bg-[radial-gradient(circle,var(--color-purple-100),transparent_70%)]",
          )}
        />

        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          priority={priority}
          // Below the fold these decode as they are reached; the blur keeps
          // that from reading as a pop-in.
          loading={priority ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          sizes={sizes}
          className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-none object-contain object-bottom"
        />

        {cards}
      </div>
    </div>
  );
}

/**
 * Anchor points for floating cards.
 *
 * Across these cut-outs the head and shoulders occupy roughly the top 40% of
 * the frame, and the hands — crossed, gesturing or holding something — start
 * around 62%. Cards live in the band between.
 *
 * They are anchored by their *bottom* edge, not their top. A card's height
 * varies with the column it sits in: the same two lines are 10% of a 600px
 * hero frame but 15% of a 380px service-page frame, so a fixed top would let
 * the taller one drop onto the hands. Pinning the bottom keeps that edge
 * exactly where it belongs at every size, and the card grows upward into the
 * empty chest area instead.
 */
const anchors = {
  "high-left": "left-[-4%] bottom-[54%]",
  "high-right": "right-[-4%] bottom-[54%]",
  "mid-left": "left-[-5%] bottom-[46%]",
  "mid-right": "right-[-5%] bottom-[46%]",
  "low-left": "left-[-4%] bottom-[38%]",
  "low-right": "right-[-4%] bottom-[38%]",
} as const;

/**
 * A small floating card. Decorative: it restates, in miniature, something the
 * surrounding copy already says, so nothing is lost when it is skipped.
 */
export function FloatCard({
  at,
  icon,
  title,
  detail,
  className,
}: {
  at: keyof typeof anchors;
  icon?: ReactNode;
  title: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-float-card=""
      className={cn(
        "absolute z-10 flex w-max max-w-[76%] items-center gap-2.5 rounded-xl border border-line",
        "bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:gap-3 sm:px-3.5 sm:py-3",
        anchors[at],
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="min-w-0">
        <span className="block text-[0.6875rem] font-semibold leading-tight text-ink-primary sm:text-xs">
          {title}
        </span>
        {detail ? (
          <span className="mt-0.5 block text-[0.625rem] leading-tight text-ink-muted sm:text-[0.6875rem]">
            {detail}
          </span>
        ) : null}
      </span>
    </div>
  );
}

/** Round icon chip used inside FloatCard. */
export function CardIcon({
  children,
  tone = "success",
}: {
  children: ReactNode;
  tone?: "success" | "violet" | "gold";
}) {
  return (
    <span
      className={cn(
        "flex size-7 items-center justify-center rounded-full sm:size-8",
        tone === "success" && "bg-[#e6f2ec] text-success",
        tone === "violet" && "bg-purple-100 text-purple-700",
        tone === "gold" && "bg-gold-100 text-gold-800",
      )}
    >
      {children}
    </span>
  );
}

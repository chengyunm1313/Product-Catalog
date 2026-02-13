/**
 * Seed 初始資料 API
 * POST：寫入產品 + 文章初始資料至 Firestore
 * 僅供開發環境使用
 */

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

const seedProducts = [
	{
		slug: 'industrial-sensor-pro',
		name: '專業級工業感測器',
		descriptionJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '高精度溫度與濕度感測器，適用於各種工業環境。採用瑞士進口感測晶片，量測精度達 ±0.1°C。',
						},
					],
				},
				{ type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '產品特色' }] },
				{
					type: 'bulletList',
					content: [
						{
							type: 'listItem',
							content: [
								{ type: 'paragraph', content: [{ type: 'text', text: '工業級 IP67 防護等級' }] },
							],
						},
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: '支援 Modbus / RS485 通訊協議' }],
								},
							],
						},
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: '工作溫度範圍 -40°C ~ 85°C' }],
								},
							],
						},
					],
				},
			],
		},
		price: 12800,
		sku: 'SNR-PRO-100',
		status: 'published',
		images: [],
		categoryIds: ['sensors'],
		tags: ['感測器', '工業級', '溫濕度'],
		specs: {
			型號: 'SNR-PRO-100',
			尺寸: '120 x 80 x 45 mm',
			重量: '350g',
			工作溫度: '-40°C ~ 85°C',
			防護等級: 'IP67',
		},
		seo: {
			title: '專業級工業感測器 — Brand',
			description: '高精度溫度與濕度感測器，適用於各種工業環境。',
		},
	},
	{
		slug: 'smart-control-module',
		name: '智能控制模組',
		descriptionJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '支援多協議的智能控制模組，可遠端監控與操作。整合 Wi-Fi / Bluetooth / Zigbee 三種無線通訊。',
						},
					],
				},
			],
		},
		price: 24500,
		sku: 'CTL-SMT-200',
		status: 'published',
		images: [],
		categoryIds: ['controllers'],
		tags: ['控制模組', '智能', '遠端監控'],
		specs: { 型號: 'CTL-SMT-200', 通訊: 'Wi-Fi / BT / Zigbee', 供電: 'DC 12-24V', 功耗: '< 5W' },
		seo: {
			title: '智能控制模組 — Brand',
			description: '支援多協議的智能控制模組，可遠端監控與操作。',
		},
	},
	{
		slug: 'precision-measurement',
		name: '精密量測儀器',
		descriptionJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '高解析度精密量測設備，符合國際標準規範。適用於實驗室與產線品管。',
						},
					],
				},
			],
		},
		price: 56000,
		sku: 'MSR-PRC-300',
		status: 'published',
		images: [],
		categoryIds: ['measurement'],
		tags: ['量測儀器', '精密', '品管'],
		specs: { 型號: 'MSR-PRC-300', 解析度: '0.001mm', 量程: '0 ~ 300mm', 認證: 'ISO 17025' },
		seo: { title: '精密量測儀器 — Brand', description: '高解析度精密量測設備，符合國際標準規範。' },
	},
	{
		slug: 'automation-control-system',
		name: '自動化控制系統',
		descriptionJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '一體化的生產線自動化控制解決方案，支援 PLC 程式化控制與 SCADA 監控整合。',
						},
					],
				},
			],
		},
		price: 198000,
		sku: 'AUT-SYS-400',
		status: 'published',
		images: [],
		categoryIds: ['automation'],
		tags: ['自動化', 'PLC', 'SCADA'],
		specs: {
			型號: 'AUT-SYS-400',
			PLC: 'Siemens S7-1500 相容',
			通道數: '64 DI / 32 DO',
			介面: 'PROFINET / EtherCAT',
		},
		seo: { title: '自動化控制系統 — Brand', description: '一體化生產線自動化控制解決方案。' },
	},
	{
		slug: 'env-monitor-station',
		name: '環境監測站',
		descriptionJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '整合式環境資料監測解決方案，支援即時雲端數據上傳與視覺化儀表板。',
						},
					],
				},
			],
		},
		price: 85000,
		sku: 'ENV-MON-500',
		status: 'published',
		images: [],
		categoryIds: ['sensors'],
		tags: ['環境監測', '雲端', 'IoT'],
		specs: {
			型號: 'ENV-MON-500',
			監測項目: '溫度/濕度/PM2.5/CO2/噪音',
			傳輸: '4G LTE / LoRa',
			供電: '太陽能 + 電池',
		},
		seo: { title: '環境監測站 — Brand', description: '整合式環境資料監測解決方案。' },
	},
	{
		slug: 'industrial-display-panel',
		name: '工業級顯示面板',
		descriptionJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '高亮度 IP65 防護等級工業觸控面板，採用電容式多點觸控技術，可戴手套操作。',
						},
					],
				},
			],
		},
		price: 32000,
		sku: 'DSP-IND-600',
		status: 'draft',
		images: [],
		categoryIds: ['controllers'],
		tags: ['顯示面板', '觸控', '工業級'],
		specs: {
			型號: 'DSP-IND-600',
			尺寸: '10.1 吋',
			解析度: '1920 x 1200',
			亮度: '1000 nits',
			防護: 'IP65',
		},
		seo: { title: '工業級顯示面板 — Brand', description: '高亮度 IP65 防護等級工業觸控面板。' },
	},
];

const seedPosts = [
	{
		slug: 'industry-trends-2025',
		title: '2025 產業趨勢前瞻',
		status: 'published',
		contentJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '深入分析未來一年的產業變革方向，從自動化到智慧製造的關鍵趨勢。隨著 AI 和 IoT 技術的快速發展，製造業正迎來前所未有的轉型機遇。',
						},
					],
				},
				{
					type: 'heading',
					attrs: { level: 2 },
					content: [{ type: 'text', text: '趨勢一：AI 驅動的預測性維護' }],
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '透過機器學習演算法分析設備運行數據，提前預測設備故障，減少非計劃性停機時間達 70%。',
						},
					],
				},
				{
					type: 'heading',
					attrs: { level: 2 },
					content: [{ type: 'text', text: '趨勢二：數位孿生技術' }],
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '建立實體設備的虛擬映射，實現遠端監控、模擬調試和效能優化，大幅縮短產品開發週期。',
						},
					],
				},
				{
					type: 'heading',
					attrs: { level: 2 },
					content: [{ type: 'text', text: '趨勢三：邊緣運算' }],
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '在設備端直接進行數據處理和決策，降低延遲並提高即時性，特別適合對時序要求嚴格的工控場景。',
						},
					],
				},
			],
		},
		seo: {
			title: '2025 產業趨勢前瞻 — Brand',
			description: '深入分析產業變革方向，從自動化到智慧製造的關鍵趨勢。',
		},
		coverImage: '',
		tags: ['產業趨勢', '智慧製造', 'AI'],
		author: '管理員',
	},
	{
		slug: 'sensor-selection-guide',
		title: '感測器選型完全指南',
		status: 'published',
		contentJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '如何根據應用場景選擇最合適的感測器？本文整理了常見的選型要點與注意事項，幫助您做出最佳決策。',
						},
					],
				},
				{
					type: 'heading',
					attrs: { level: 2 },
					content: [{ type: 'text', text: '一、確認量測目標' }],
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '首先釐清需要量測的物理量（溫度、壓力、流量等），以及所需的精度範圍。不同的量測目標有完全不同的感測器技術路線。',
						},
					],
				},
				{
					type: 'heading',
					attrs: { level: 2 },
					content: [{ type: 'text', text: '二、環境條件評估' }],
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '工作溫度範圍、濕度、振動、腐蝕性氣體等環境因素都會影響感測器的選擇。務必確認感測器的防護等級符合現場條件。',
						},
					],
				},
			],
		},
		seo: {
			title: '感測器選型完全指南 — Brand',
			description: '根據應用場景選擇最合適的感測器，常見選型要點與注意事項。',
		},
		coverImage: '',
		tags: ['技術指南', '感測器'],
		author: '管理員',
	},
	{
		slug: 'quality-assurance-process',
		title: '品質保證流程揭密',
		status: 'published',
		contentJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '了解我們如何透過嚴格的品質控管流程，確保每一件產品符合最高標準。從原材料檢驗到成品出貨，每個環節都有完善的品質管制。',
						},
					],
				},
				{
					type: 'blockquote',
					content: [
						{
							type: 'paragraph',
							content: [{ type: 'text', text: '品質不是偶然，而是持續追求卓越的結果。' }],
						},
					],
				},
			],
		},
		seo: {
			title: '品質保證流程揭密 — Brand',
			description: '了解我們嚴格的品質控管流程，確保產品符合最高標準。',
		},
		coverImage: '',
		tags: ['品質管理'],
		author: '編輯',
	},
	{
		slug: 'smart-factory-case-study',
		title: '智慧工廠導入案例分享',
		status: 'published',
		contentJson: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '某大型製造商透過我們的自動化控制系統與環境監測解決方案，成功將產線效能提升 30%，不良率降低 45%。',
						},
					],
				},
				{ type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '客戶背景' }] },
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: '該企業為國內知名的電子零組件製造商，年產值超過 50 億元，擁有 3 座生產工廠。',
						},
					],
				},
				{ type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '導入成效' }] },
				{
					type: 'bulletList',
					content: [
						{
							type: 'listItem',
							content: [
								{ type: 'paragraph', content: [{ type: 'text', text: '產線效能提升 30%' }] },
							],
						},
						{
							type: 'listItem',
							content: [{ type: 'paragraph', content: [{ type: 'text', text: '不良率降低 45%' }] }],
						},
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: '年度維護成本節省 800 萬元' }],
								},
							],
						},
					],
				},
			],
		},
		seo: {
			title: '智慧工廠導入案例分享 — Brand',
			description: '客戶透過我們的系統成功將產線效能提升 30%。',
		},
		coverImage: '',
		tags: ['案例分享', '自動化', '智慧工廠'],
		author: '管理員',
	},
];

const seedPages = [
	{
		slug: 'services',
		title: '服務項目',
		status: 'published',
		blocks: [
			{
				type: 'hero',
				data: {
					title: '專業服務',
					subtitle: '從規劃到售後，全方位的技術服務支援',
					images: [],
					buttonText: '聯絡我們',
					buttonLink: '/contact-us',
				},
			},
			{
				type: 'richText',
				data: {
					contentJson: {
						type: 'doc',
						content: [
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: '技術諮詢' }],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: '我們的專業團隊提供免費的初步技術諮詢，協助您評估需求、選擇最適合的解決方案。無論是新廠規劃或既有產線升級，都能為您量身打造最佳方案。',
									},
								],
							},
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: '系統整合' }],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: '從感測器布署、控制模組安裝到 SCADA 系統整合，提供一站式的系統整合服務。確保各元件間的完美協作，發揮系統最大效能。',
									},
								],
							},
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: '教育訓練' }],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: '提供完整的操作訓練課程，包含設備操作、日常維護、故障排除等內容。確保您的團隊能夠獨立操作與維護設備。',
									},
								],
							},
						],
					},
				},
			},
		],
		seo: {
			title: '服務項目 — Brand',
			description: '從規劃到售後，全方位的技術服務支援。',
		},
	},
	{
		slug: 'faq',
		title: '常見問題',
		status: 'published',
		blocks: [
			{
				type: 'hero',
				data: {
					title: '常見問題',
					subtitle: '快速找到您需要的答案',
					images: [],
					buttonText: '',
					buttonLink: '',
				},
			},
			{
				type: 'richText',
				data: {
					contentJson: {
						type: 'doc',
						content: [
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: 'Q：產品保固期有多長？' }],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: 'A：標準產品均提供兩年保固。保固期間內如有非人為因素造成的故障，我們將免費維修或更換。',
									},
								],
							},
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: 'Q：可以客製化產品嗎？' }],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: 'A：是的，我們提供客製化服務。請透過聯絡表單提出需求，我們的技術團隊會在 3 個工作天內回覆評估結果。',
									},
								],
							},
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: 'Q：是否提供現場安裝服務？' }],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: 'A：是的，我們在全台各地均有配合的服務據點。大型系統整合專案提供免費現場安裝與調試，獨立產品則提供付費到府安裝服務。',
									},
								],
							},
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: 'Q：如何取得技術支援？' }],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: 'A：您可以透過客服專線（02-2345-6789）、Email (support@brand.com) 或官網聯絡表單聯繫我們。工作日 9:00-18:00 提供即時技術支援。',
									},
								],
							},
						],
					},
				},
			},
		],
		seo: {
			title: '常見問題 — Brand',
			description: '關於產品保固、客製化與技術支援的常見問題解答。',
		},
	},
	{
		slug: 'contact-us',
		title: '聯絡我們',
		status: 'published',
		blocks: [
			{
				type: 'hero',
				data: {
					title: '聯絡我們',
					subtitle: '我們期待為您提供最佳的服務體驗',
					images: [],
					buttonText: '',
					buttonLink: '',
				},
			},
			{
				type: 'richText',
				data: {
					contentJson: {
						type: 'doc',
						content: [
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: '聯絡方式' }],
							},
							{
								type: 'bulletList',
								content: [
									{
										type: 'listItem',
										content: [
											{
												type: 'paragraph',
												content: [
													{ type: 'text', marks: [{ type: 'bold' }], text: '電話：' },
													{ type: 'text', text: '02-2345-6789' },
												],
											},
										],
									},
									{
										type: 'listItem',
										content: [
											{
												type: 'paragraph',
												content: [
													{ type: 'text', marks: [{ type: 'bold' }], text: 'Email：' },
													{ type: 'text', text: 'info@brand.com' },
												],
											},
										],
									},
									{
										type: 'listItem',
										content: [
											{
												type: 'paragraph',
												content: [
													{ type: 'text', marks: [{ type: 'bold' }], text: '地址：' },
													{
														type: 'text',
														text: '10667 台北市大安區敦化南路二段 100 號 12 樓',
													},
												],
											},
										],
									},
								],
							},
							{
								type: 'heading',
								attrs: { level: 2 },
								content: [{ type: 'text', text: '營業時間' }],
							},
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: '週一至週五 09:00 — 18:00（國定假日休息）',
									},
								],
							},
						],
					},
				},
			},
			{
				type: 'customCTA',
				data: {
					title: '需要報價？',
					description: '填寫需求表單，我們將在 24 小時內回覆您的詢問。',
					buttonText: '填寫需求單',
					buttonLink: 'mailto:info@brand.com',
				},
			},
		],
		seo: {
			title: '聯絡我們 — Brand',
			description: '電話、Email、地址與營業時間，歡迎與我們聯繫。',
		},
	},
];

export async function POST() {
	try {
		const now = new Date().toISOString();

		// 先清除舊資料，避免重複
		const collections = ['products', 'posts', 'pages'];
		for (const col of collections) {
			const snapshot = await adminDb.collection(col).get();
			const delBatch = adminDb.batch();
			snapshot.docs.forEach((doc) => delBatch.delete(doc.ref));
			if (!snapshot.empty) await delBatch.commit();
		}

		const batch = adminDb.batch();

		// 寫入產品
		for (const product of seedProducts) {
			const ref = adminDb.collection('products').doc();
			batch.set(ref, { ...product, createdAt: now, updatedAt: now });
		}

		// 寫入文章
		for (const post of seedPosts) {
			const ref = adminDb.collection('posts').doc();
			batch.set(ref, { ...post, createdAt: now, updatedAt: now });
		}

		// 寫入頁面
		for (const page of seedPages) {
			const ref = adminDb.collection('pages').doc();
			batch.set(ref, { ...page, createdAt: now, updatedAt: now });
		}

		await batch.commit();

		return NextResponse.json({
			success: true,
			message: `已寫入 ${seedProducts.length} 筆產品、${seedPosts.length} 篇文章、${seedPages.length} 個頁面`,
		});
	} catch (error) {
		console.error('Seed 失敗:', error);
		return NextResponse.json({ success: false, error: 'Seed 失敗' }, { status: 500 });
	}
}

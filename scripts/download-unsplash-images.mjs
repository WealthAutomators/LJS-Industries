/**
 * Downloads unique Unsplash images for LJS Industries storefront.
 * Hero, categories, banners, products (×2), and review photos.
 * Uses images.unsplash.com direct URLs only — no API key.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

/** Curated Unsplash photo IDs — industrial, storage, workshop, desk, tools, kitchen, outdoor */
const POOLS = {
  hero: [
    "photo-1504148455328-c376907d081c",
    "photo-1581092918056-0c4c3acd3789",
    "photo-1497366216548-37526070297c",
  ],
  storage: [
    "photo-1595428774223-ef52624120d2",
    "photo-1558618666-fcd25c85cd64",
    "photo-1586023496775-813d975d5192",
    "photo-1600585154526-990dced4db0d",
    "photo-1618221195710-e982f1f8752b",
    "photo-1616486327342-c4ada60c33e5",
    "photo-1600566753086-00f18fb6b3ea",
    "photo-1600607687939-ce8a6c25118c",
    "photo-1560448204-e02f11c2d0e2",
    "photo-1502672260266-1c1ef1d93688",
  ],
  workspace: [
    "photo-1497366754035-f200968a6e72",
    "photo-1486312338219-ce68d2c6f44d",
    "photo-1524758631624-e2822e304c36",
    "photo-1593062096039-9a26b09da705",
    "photo-1586281380349-632531db7ed4",
    "photo-1518455027359-f3f8164ba9c7",
    "photo-1497215728101-856f4ea42174",
    "photo-1432888498266-38ffec3eaf0a",
    "photo-1460925895917-afdab827c52f",
    "photo-1497366811353-6870744d04b2",
  ],
  tools: [
    "photo-1530124566582-a618bc2615dc",
    "photo-1504917595217-d4dc5ebe6122",
    "photo-1426927308491-6380b6a15452",
    "photo-1581092160562-40aa08e78837",
    "photo-1581091226825-a6a2a5aee158",
    "photo-1565814329452-261b26e8ea62",
    "photo-1504328342243-7fe5c415a43a",
    "photo-1572981779307-38b8cabb2407",
    "photo-1534190239940-9ba8823032a5",
    "photo-1581094794329-c8112a89af12",
  ],
  outdoor: [
    "photo-1504280390367-361c6d9f38f4",
    "photo-1478131143081-80f7f84ca84d",
    "photo-1523987355523-c7b5b0dd90a7",
    "photo-1445307806294-bff7f67ee8c8",
    "photo-1470246973918-29a932ac3c6d",
    "photo-1501555088652-021faa106b9b",
    "photo-1469854523086-cc02fe5d8800",
    "photo-1537905569824-f89f14cceb68",
    "photo-1510312305653-8ed496efae75",
    "photo-1493246507139-91e8fad9978e",
  ],
  kitchen: [
    "photo-1556909114-f6e7ad7d5046",
    "photo-1556912172-45b7abe8b7e1",
    "photo-1570222096853-7762faff523e",
    "photo-1565183997392-2f6f122e5912",
    "photo-1600585154340-be6161a56a0c",
    "photo-1556910103-1c02745aae4d",
    "photo-1495474472287-4d71bcdd2085",
    "photo-1514432324607-a09d9b4aefdd",
    "photo-1490818387583-1baba5e638af",
    "photo-1556909172-54557bd7e09a",
  ],
  electronics: [
    "photo-1550009158-9ebf69173e03",
    "photo-1519389950473-47ba0277781c",
    "photo-1498049794561-7780e7231661",
    "photo-1588508065123-287b28e013da",
    "photo-1593642632823-8fa782be72a5",
    "photo-1518770660439-4636190af475",
    "photo-1527864550417-8fd665563061",
    "photo-1544197150-b99a580bb7a2",
    "photo-1555664423-caef9b4c0f5e",
    "photo-1609081219090-a6d81d3085bf",
  ],
  bathroom: [
    "photo-1600566753190-17fedebaa088",
    "photo-1620626011761-996317b8d101",
    "photo-1631889992164-882aae16d807",
    "photo-1507652313519-d4e9174996ca",
    "photo-1584622781867-0d7f090daa3e",
    "photo-1552320884-9c4fef4ef589",
  ],
  beauty: [
    "photo-1522335789203-aabd1fc54bc9",
    "photo-1596462502278-27bfdc403348",
    "photo-1512496015851-a90fb38ba796",
    "photo-1570172619644-df0cb7bf0a08",
    "photo-1612817288484-6f916006177a",
    "photo-1522338242992-e1a74c7c8c4b",
  ],
  sports: [
    "photo-1544367567-0f2fcb009e0b",
    "photo-1518611012118-696072aa579a",
    "photo-1517836357463-d25dfeac3438",
    "photo-1576678927484-cc907957088c",
    "photo-1534438327276-14e5300c3a48",
    "photo-1517963879433-6ad2b056d944",
  ],
  gaming: [
    "photo-1542751371-adc38448a05e",
    "photo-1612287230202-1ff1d85d1bdf",
    "photo-1593305841996-0f692d36b9a3",
    "photo-1606144042614-b2417e99c4e3",
    "photo-1538481199705-c710c4e965fc",
  ],
  pets: [
    "photo-1548199973-03cce0cfb87f",
    "photo-1450778869180-41d0601e046e",
    "photo-1516734212186-a967f81ad0d4",
    "photo-1601758228041-f3b2795255f1",
    "photo-1587300003388-59208cc962cb",
  ],
  baby: [
    "photo-1515488042361-ee00e5178171",
    "photo-1555252333-261312295877",
    "photo-1519689680058-324335c77eba",
    "photo-1566454825481-9c31ed80c3a8",
    "photo-1503454535920-2a2bab2645a2",
  ],
  health: [
    "photo-1506126613408-eca07ce68773",
    "photo-1512621776951-a57141f2eefd",
    "photo-1571019613454-1cb2f99b2d8b",
    "photo-1540497077202-7c8a3999166f",
    "photo-1518611012118-696072aa579a",
  ],
  travel: [
    "photo-1553062407-98eeb64c6a62",
    "photo-1565026057447-bc90a20c1260",
    "photo-1469854523086-cc02fe5d8800",
    "photo-1488646953014-85cb44e25828",
    "photo-1501785888041-af3fc6d0f1c0",
  ],
  educational: [
    "photo-1566576912321-d58ddd7a6088",
    "photo-1558068710-1c8e0857584f",
    "photo-1587654780291-39c9404d746b",
    "photo-1503676260728-1c00da094a0b",
    "photo-1588072432836-e10032774350",
  ],
  lifestyle: [
    "photo-1607082348824-0a6f2a591e89",
    "photo-1600880292089-3d770f7eefb9",
    "photo-1555042879-3bbffead5596",
    "photo-1516975080662-de93384bdaf7",
    "photo-1600210492486-724fe5c67fb0",
    "photo-1560448075-71d129397b25",
    "photo-1631049307264-da0ec9d70304",
    "photo-1615873964743-90a0b759fc5e",
    "photo-1600607687644-c7171b42498b",
    "photo-1564071665922-072f0d6f6bd8",
    "photo-1600585152915-d208bec867a1",
    "photo-1600607687920-4e2a09cf159d",
    "photo-1600585154363-67eb9e2e2099",
    "photo-1505693416388-ac5ce068fe85",
    "photo-1595526114035-0d45ed16cfbf",
    "photo-1604014237800-1c9102c219da",
    "photo-1581578731548-c64695cc6952",
    "photo-1555041169-4ebf927d8357",
    "photo-1600185365483-26edb4bd4c45",
    "photo-1628177150159-2f8ce6df1f1e",
    "photo-1583847260160-a63b3f677b9a",
    "photo-1563453397-107a7c3efb2e",
    "photo-1556228453-efd6c1ff04f6",
    "photo-1587043862100-01920db231ba",
    "photo-1496890185067-72d7d9af66b1",
    "photo-1589898362790-edba11d34869",
    "photo-1596683705523-eb49540c3934",
    "photo-1602658327972-85bb6521a086",
    "photo-1603400522537-35e25a14bc1e",
    "photo-1616663717839-2fea42e1a1f6",
    "photo-1619263719761-165c773ee5df",
    "photo-1620000190821-abd8f262b86f",
    "photo-1630381260593-45e8f922997b",
    "photo-1523471826770-c437b4636fe6",
    "photo-1558505780-1e584fab3ede",
    "photo-1574421233376-06f2ccf017f7",
    "photo-1590439471364-192aa70c0b53",
    "photo-1609840112990-4265448268d1",
    "photo-1616627502968-858f7b39f574",
    "photo-1617811449482-31093c8cee16",
    "photo-1621468644541-deea173bd43e",
    "photo-1533759413974-9e15f3b745ac",
    "photo-1595182939836-5d4ba24ae7bf",
    "photo-1608651061499-ff031fbf6645",
    "photo-1571896349842-33c89424de2d",
    "photo-1560185127-6ed189bf02f4",
    "photo-1615529328331-f8917597711f",
    "photo-1556228578-8c89e6adf883",
    "photo-1540555700478-4be289fbecef",
    "photo-1600566752355-35792bedcfea",
    "photo-1596394516093-87feb5cb33dd",
    "photo-1519823551278-64ae032d27e0",
    "photo-1600047509807-ba8f88d3cdf7",
    "photo-1631679705879-a6ba6902b779",
    "photo-1513693902810-1b7c3ceaa280",
    "photo-1600573472592-401b489b3cdc",
    "photo-1600607688969-a5bfcd6461fe",
    "photo-1515377905543-f15e52645c35",
    "photo-1595514537822-8e284785127e",
    "photo-1527515637465-c94e0ddbfe09",
    "photo-1616628188855-8c7a03445b07",
    "photo-1556911220-e15b29be8c8f",
    "photo-1585128891439-41ce1d0a1f0b",
    "photo-1615874959471-d2fadcb4ad5d",
    "photo-1484154218962-a197022b5858",
    "photo-1556911221-bff31c812bea",
    "photo-1600210492493-0946911123ea",
    "photo-1616046229478-9901c5536a45",
    "photo-1615529182904-14819c35db37",
    "photo-1618220179428-22790b461013",
    "photo-1556912173-46c336c7fd55",
    "photo-1588854337115-1c67d9247f4d",
    "photo-1600489000022-c2086d27dc77",
    "photo-1600566753376-12c8ab7fb75b",
    "photo-1600573472550-8090b5e0745e",
    "photo-1600047509358-9dc785341309",
    "photo-1600607686527-6fb886090705",
    "photo-1556228720-195a672e8a03",
    "photo-1600585152220-903fbbf1672d",
    "photo-1617806118233-18e1de247200",
    "photo-1616047006789-b7af5afb8c21",
    "photo-1556229010-6c3f2c9ca5f8",
    "photo-1560185007-cde436f6a4d0",
    "photo-1600585154084-4e5fe7c39198",
    "photo-1600210491892-03d54c0aaf87",
    "photo-1616486338812-3dadae4b4ace",
    "photo-1584622650111-993a426fbf0a",
    "photo-1556910103-e15b29be8c8f",
    "photo-1585515320310-259814833e95",
    "photo-1517668808822-9ebb02f2a0e6",
    "photo-1592432670736-3299669ea351",
    "photo-1571019614242-c5c5dee9f50b",
    "photo-1583511655852-d21ac8a622af",
    "photo-1555252337-59f4fe5e5c77",
    "photo-1601925265168-242426a8c117",
    "photo-1608571428392-a4c1a89f9949",
    "photo-1611892440509-7a25aafad115",
    "photo-1661940968217-583e272f6fc6",
    "photo-1684445034670-b36aca25c25a",
    "photo-1670930887547-518452a967fb",
    "photo-1664372899275-05bdd18c8516",
    "photo-1679064287065-66207aa15ab7",
    "photo-1676638155455-7db84193f440",
    "photo-1674747086448-2270b41ac808",
    "photo-1639298107786-fc9e5880016f",
    "photo-1639298109207-5a9ccc254481",
    "photo-1666934209606-a955a12edd63",
    "photo-1674924389976-005a3dba2896",
    "photo-1687951812646-efa29195a80d",
    "photo-1724847885015-be191f1a47ef",
    "photo-1638232928539-6e91c47ddec5",
    "photo-1639298107851-058984903954",
    "photo-1650481093978-6cc58e4649f4",
    "photo-1664881353843-769f951ff470",
    "photo-1700590906201-2739ba9efbe9",
    "photo-1707291173710-10514ef55814",
    "photo-1716078103276-133ae3e98424",
    "photo-1523481400522-73651ccf5d4b",
    "photo-1505691938895-1758d7feb511",
    "photo-1615874694520-474822394687",
    "photo-1618221381711-42ca8ab6e908",
    "photo-1616046229478-9901c5536a45",
    "photo-1615529182904-14819c35db37",
    "photo-1585128891439-41ce1d0a1f0b",
    "photo-1484154218962-a197022b5858",
    "photo-1556911221-bff31c812bea",
    "photo-1600210492493-0946911123ea",
  ],
};

const CATEGORY_SLUG_POOL = {
  "home-living": POOLS.storage,
  workspace: POOLS.workspace,
  "tools-utility": POOLS.tools,
  outdoor: POOLS.outdoor,
  kitchen: POOLS.kitchen,
  electronics: POOLS.electronics,
  bathroom: POOLS.bathroom,
  beauty: POOLS.beauty,
  sports: POOLS.sports,
  gaming: POOLS.gaming,
  "pet-supplies": POOLS.pets,
  "baby-products": POOLS.baby,
  "health-wellness": POOLS.health,
  travel: POOLS.travel,
  educational: POOLS.educational,
};

/** Explicit primary image per product slug for visual relevance (56 products) */
const PRODUCT_PRIMARY = {
  // Home & Living
  "modular-storage-organizer": "photo-1595428774223-ef52624120d2",
  "motion-sensor-cabinet-light": "photo-1600585152220-903fbbf1672d",
  "foldable-utility-cart": "photo-1558618666-fcd25c85cd64",
  "magnetic-wall-organizer": "photo-1615874959471-d2fadcb4ad5d",
  "under-sink-organizer": "photo-1588854337115-1c67d9247f4d",
  // Workspace
  "bamboo-monitor-riser": "photo-1524758631624-e2822e304c36",
  "cable-management-tray": "photo-1519389950473-47ba0277781c",
  "adjustable-task-lamp": "photo-1518455027359-f3f8164ba9c7",
  "desktop-document-organizer": "photo-1586281380349-632531db7ed4",
  "ergonomic-footrest": "photo-1497215728101-856f4ea42174",
  "desktop-drawer-unit": "photo-1593062096039-9a26b09da705",
  // Tools & Utility
  "magnetic-tool-holder-bar": "photo-1504148455328-c376907d081c",
  "precision-screwdriver-set": "photo-1530124566582-a618bc2615dc",
  "folding-utility-knife": "photo-1504917595217-d4dc5ebe6122",
  "digital-measuring-tape": "photo-1572981779307-38b8cabb2407",
  "compact-tool-organizer": "photo-1426927308491-6380b6a15452",
  "portable-work-light": "photo-1581092160562-40aa08e78837",
  // Outdoor
  "portable-camping-lantern": "photo-1504280390367-361c6d9f38f4",
  "garden-storage-bin": "photo-1416879595882-3373a0480b5b",
  "outdoor-gear-organizer": "photo-1478131143081-80f7f84ca84d",
  "folding-utility-table": "photo-1523987355523-c7b5b0dd90a7",
  "camping-cookware-set": "photo-1470246973918-29a932ac3c6d",
  // Kitchen (prefer new IDs for reused slugs)
  "electric-kettle": "photo-1565183997392-2f6f122e5912",
  "coffee-grinder": "photo-1495474472287-4d71bcdd2085",
  "electric-spice-grinder": "photo-1596040033229-a9821f5dcc4a",
  "silicone-food-storage-set": "photo-1600585154340-be6161a56a0c",
  "countertop-canister-set": "photo-1556910103-1c02745aae4d",
  "digital-kitchen-scale": "photo-1556909172-54557bd7e09a",
  "stackable-food-containers": "photo-1556909114-f6e7ad7d5046",
  // Electronics — docks/chargers, not earbuds/headphones
  "usb-c-docking-station": "photo-1550009158-9ebf69173e03",
  "portable-hdmi-display": "photo-1498049794561-7780e7231661",
  "smart-plug-4-pack": "photo-1544197150-b99a580bb7a2",
  "multi-device-charging-station": "photo-1609081219090-a6d81d3085bf",
  "bluetooth-item-tracker": "photo-1527864550417-8fd665563061",
  "desk-charging-hub": "photo-1588508065123-287b28e013da",
  // Beauty
  "ceramic-styling-iron": "photo-1522335789203-aabd1fc54bc9",
  "acrylic-makeup-organizer": "photo-1512496015851-a90fb38ba796",
  // Sports (prefer new IDs for reused slugs)
  "yoga-mat": "photo-1544367567-0f2fcb009e0b",
  "resistance-bands-set": "photo-1517963879433-6ad2b056d944",
  "adjustable-kettlebell": "photo-1534438327276-14e5300c3a48",
  "hiking-daypack": "photo-1501555088652-021faa106b9b",
  // Gaming
  "controller-charging-dock": "photo-1606144042614-b2417e99c4e3",
  "gaming-headset-stand": "photo-1542751371-adc38448a05e",
  // Pet (prefer new IDs)
  "dog-bed": "photo-1548199973-03cce0cfb87f",
  "elevated-pet-feeder": "photo-1450778869180-41d0601e046e",
  // Baby (prefer new IDs)
  "baby-monitor": "photo-1566454825481-9c31ed80c3a8",
  "soft-plush-blanket": "photo-1503454535920-2a2bab2645a2",
  "diaper-caddy-organizer": "photo-1515488042361-ee00e5178171",
  // Health (prefer new IDs)
  "foam-roller": "photo-1571019613454-1cb2f99b2d8b",
  "compact-massage-gun": "photo-1540497077202-7c8a3999166f",
  // Travel
  "packing-cubes-set": "photo-1553062407-98eeb64c6a62",
  "travel-toiletry-organizer": "photo-1565026057447-bc90a20c1260",
  // Educational (prefer new IDs)
  "building-blocks-set": "photo-1566576912321-d58ddd7a6088",
  "magnetic-building-tiles": "photo-1558068710-1c8e0857584f",
  // Bathroom (prefer new IDs for reused slug)
  "bath-towel-set": "photo-1507652313519-d4e9174996ca",
  "bamboo-bath-caddy": "photo-1600566753190-17fedebaa088",
};

const CATEGORY_IMAGES = {
  "home-living": "photo-1618221195710-e982f1f8752b",
  workspace: "photo-1497366754035-f200968a6e72",
  "tools-utility": "photo-1581092918056-0c4c3acd3789",
  outdoor: "photo-1445307806294-bff7f67ee8c8",
  electronics: "photo-1593642632823-8fa782be72a5",
  kitchen: "photo-1556912172-45b7abe8b7e1",
  bathroom: "photo-1620626011761-996317b8d101",
  beauty: "photo-1612817288484-6f916006177a",
  sports: "photo-1518611012118-696072aa579a",
  gaming: "photo-1612287230202-1ff1d85d1bdf",
  "pet-supplies": "photo-1516734212186-a967f81ad0d4",
  "baby-products": "photo-1555252333-261312295877",
  "health-wellness": "photo-1506126613408-eca07ce68773",
  travel: "photo-1488646953014-85cb44e25828",
  educational: "photo-1503676260728-1c00da094a0b",
};

const BANNER_IMAGES = {
  "banners/about.jpg": "photo-1497366216548-37526070297c",
  "banners/featured.jpg": "photo-1600607687939-ce8a6c25118c",
  "banners/utility-collection.jpg": "photo-1581091226825-a6a2a5aee158",
  "banners/need-organize.jpg": "photo-1586023496775-813d975d5192",
  "banners/need-workspace.jpg": "photo-1486312338219-ce68d2c6f44d",
  "banners/need-kitchen.jpg": "photo-1570222096853-7762faff523e",
  "banners/need-outdoor.jpg": "photo-1469854523086-cc02fe5d8800",
  "banners/need-tech.jpg": "photo-1518770660439-4636190af475",
  "banners/need-utility.jpg": "photo-1565814329452-261b26e8ea62",
};

function unsplashUrl(photoId, width) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&q=85&w=${width}&auto=format&fit=crop`;
}

function parseProducts() {
  const content = fs.readFileSync(path.join(ROOT, "data", "products.ts"), "utf8");
  const blocks = content.split(/\n  \{/);
  const products = [];

  for (const block of blocks.slice(1)) {
    const slug = block.match(/slug: "([^"]+)"/)?.[1];
    const categorySlug = block.match(/categorySlug: "([^"]+)"/)?.[1];
    if (slug && categorySlug) products.push({ slug, categorySlug });
  }

  return products;
}

function buildTargets() {
  const products = parseProducts();
  const targets = [];

  targets.push({ file: "hero/hero-1.jpg", width: 2000, photoId: POOLS.hero[0] });

  for (const [file, photoId] of Object.entries(BANNER_IMAGES)) {
    const width = file.includes("need-") ? 1200 : 1600;
    targets.push({ file, width, photoId });
  }

  for (const [slug, photoId] of Object.entries(CATEGORY_IMAGES)) {
    targets.push({ file: `categories/${slug}.jpg`, width: 800, photoId });
  }

  for (const product of products) {
    const primaryId = PRODUCT_PRIMARY[product.slug];
    if (!primaryId) {
      console.warn(`  missing PRODUCT_PRIMARY for: ${product.slug}`);
    }
    const pool = CATEGORY_SLUG_POOL[product.categorySlug] || POOLS.lifestyle;
    const secondaryId = pool.find((id) => id !== primaryId) || pool[1] || pool[0];

    targets.push({
      file: `products/${product.slug}-1.jpg`,
      width: 900,
      photoId: primaryId,
      categorySlug: product.categorySlug,
    });
    targets.push({
      file: `products/${product.slug}-2.jpg`,
      width: 900,
      photoId: secondaryId,
      categorySlug: product.categorySlug,
    });
  }

  const reviewPool = [
    ...POOLS.storage,
    ...POOLS.workspace,
    ...POOLS.tools,
    ...POOLS.kitchen,
    ...POOLS.lifestyle,
  ];
  for (let i = 1; i <= 8; i++) {
    targets.push({
      file: `reviews/review-${i}.jpg`,
      width: 600,
      photoId: reviewPool[i * 3] || reviewPool[i - 1] || reviewPool[0],
    });
  }

  return targets;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "LJSIndustries/1.0 (image-setup)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("File too small");
  return buf;
}

function getFallbackPool() {
  return [...new Set(Object.values(POOLS).flat())];
}

async function main() {
  const products = parseProducts();
  const missing = products.filter((p) => !PRODUCT_PRIMARY[p.slug]);
  if (missing.length) {
    console.error(`Missing PRODUCT_PRIMARY for ${missing.length} products:`);
    for (const p of missing) console.error(`  - ${p.slug}`);
    process.exit(1);
  }

  const targets = buildTargets();
  console.log(`Downloading ${targets.length} Unsplash images for ${products.length} products...\n`);

  const usedPhotoIds = new Set();
  const usedHashes = new Set();
  const fallbackPool = getFallbackPool();
  let fallbackIndex = 0;

  const getFallback = (exclude) => {
    while (fallbackIndex < fallbackPool.length) {
      const id = fallbackPool[fallbackIndex++];
      if (!usedPhotoIds.has(id) && id !== exclude) return id;
    }
    return null;
  };

  let success = 0;
  let failed = 0;

  for (const target of targets) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    let saved = false;
    const tryIds = [target.photoId, getFallback(target.photoId)].filter(Boolean);

    for (const photoId of tryIds) {
      if (usedPhotoIds.has(photoId)) continue;

      try {
        const buf = await download(unsplashUrl(photoId, target.width));
        const hash = crypto.createHash("sha256").update(buf).digest("hex");

        if (usedHashes.has(hash)) {
          console.warn(`  skip duplicate hash: ${target.file} (${photoId})`);
          usedPhotoIds.add(photoId);
          continue;
        }

        fs.writeFileSync(dest, buf);
        usedPhotoIds.add(photoId);
        usedHashes.add(hash);
        saved = true;
        success++;
        console.log(`✓ ${target.file} ← ${photoId}`);
        break;
      } catch (err) {
        console.warn(`  retry ${target.file} (${photoId}): ${err.message}`);
      }
    }

    if (!saved) {
      for (let attempt = 0; attempt < 20 && !saved; attempt++) {
        const photoId = getFallback();
        if (!photoId || usedPhotoIds.has(photoId)) continue;

        try {
          const buf = await download(unsplashUrl(photoId, target.width));
          const hash = crypto.createHash("sha256").update(buf).digest("hex");
          if (usedHashes.has(hash)) {
            usedPhotoIds.add(photoId);
            continue;
          }

          fs.writeFileSync(dest, buf);
          usedPhotoIds.add(photoId);
          usedHashes.add(hash);
          saved = true;
          success++;
          console.log(`✓ ${target.file} ← ${photoId} (fallback)`);
        } catch {
          /* continue */
        }
      }
    }

    if (!saved) {
      failed++;
      console.error(`✗ failed: ${target.file}`);
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed, ${usedPhotoIds.size} unique photos`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

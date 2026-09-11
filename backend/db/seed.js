// Insert sample data into MongoDB

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'movie_booking';

async function seed() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  await db.collection('movies').deleteMany({});
  await db.collection('showing_movies').deleteMany({});
  await db.collection('users').deleteMany({});
  await db.collection('bookings').deleteMany({});
  await db.collection('coupons').deleteMany({});
  await db.collection('coupon_status').deleteMany({});

  await db.collection('movies').insertMany([
    {
        movie_id: 1,
        movie_name: "สโนว์ไวท์",
        movie_category: "ผจญภัย , ชีวิต",
        movie_duration: "106 นาที",
        movie_description: "Disney’s Snow White สโนว์ไวท์ คือภาพยนตร์ไลฟ์แอ็กชันมิวสิคอล ที่สร้างจากภาพยนตร์สุดคลาสสิคเมื่อปี 1937 จะเข้าฉาย 20 มีนาคม ในโรงภาพยนตร์ แสดงโดย เรเชล เซกเลอร์ (“West Side Story”) ในบทนำ และ กัล การ์ด็อท (“Wonder Woman”) ในบทแม่เลี้ยงใจร้าย การผจญภัยเคล้าเสียงเพลงสุดอัศจรรย์จะนำคุณย้อนกลับไปในเรื่องราวที่ไม่เก่าไปตามกาลเวลา ร่วมเหล่าด้วยตัวละครที่คุณรัก แบชฟูล ด็อก โดปี้ กรัมปี้ แฮปปี้ สลีปปี้ และ สนีซี่ Disney’s Snow White สโนว์ไวท์ กำกับโดย มาร์ค เว็บบ์ (“The Amazing Spider-Man”) และ อำนวยการสร้างโดย มาร์ค แพลตต์ (“The Little Mermaid”) และ จาเรด เลบอฟ (“The Girl on the Train”) ร่วมด้วย แคลลัม แมคโดกาลล์ (“Mary Poppins Returns”) ในตำแหน่งผู้อำนวยการสร้างฝ่าย และยังได้เพลงประกอบใหม่จาก เบนจ์ พาเซ็ก และ จัสติน พอล อีกด้วย (“Dear Evan Hansen”)",
        movie_actors: "กัล กาโดต์, ราเชล เซเกลอร์, แอนดรูว์ เฟลด์แมน, แอนดรูว์ เบอร์แนป, มาร์ติน เคลบบา, เจเรมี สวิฟต์, เจสัน คราวิตส์",
        movies_director: "มาร์ค เว็บบ์",
        movie_trailer: "https://www.youtube.com/embed/iV46TJKL8cU?si=PFt-nW3L-A-8Ef2N",
        movie_poster: "/images/movie01.jpeg"
    },
    {
        movie_id: 2,
        movie_name: "ฮาลาบาลา ป่าจิตหลุด",
        movie_category: "สยองขวัญ",
        movie_duration: "110 นาที",
        movie_description: "ติดตามเรื่องราวของ สารวัตรแดน (เต๋อ ฉันทวิชช์) ตำรวจมือปราบฉายา ‘แดนร้อยศพ’ ได้รับโอกาสกอบกู้ชื่อเสียง เพื่อแลกกับการกลับไปประจำการที่กรุงเทพฯ แต่ภารกิจนี้อาจหมายถึงการเดินเข้าสู่ขุมนรก เมื่อเขาต้องตามล่า ตั๊บตาไฟ (ปู แบล็คเฮด) หัวหน้าแก๊งวิปริตที่หนีออกจากเรือนจำ และหายตัวไปในป่า ‘ฮาลาบาลา’ ดินแดนต้องห้ามที่ไม่มีใครกล้ากลํ้ากราย ภายใต้เงามืดของป่ามรณะ ตำนานกระซิบถึง ‘บาเตาะ’ เผ่ากินคนโบราณที่ถูกลืมเลือน หรือบางที…พวกมันก็ไม่เคยจากไปไหน แดนต้องเลือกระหว่างหน้าที่กับชีวิตของ ‘วิ’ (ณิชา ณัฏฐณิชา) ภรรยาท้องแก่ผู้หวาดหวั่นต่อบ้านกลางป่าหลังใหม่ ที่อาจไม่ใช่เพียงพวกเขาสองคนที่อาศัยอยู่ที่นั่น เพราะบางสิ่งกำลังเฝ้ามอง และมันพร้อมจะ ‘กลืนกิน’",
        movie_actors: "อานนท์ สายแสงจันทร์, ฉันทวิชช์ ธนะเสวี, ณัฏฐณิชา ดังวัธนาวณิชย์, ยะสะกะ ไชยสร",
        movies_director: "เอกสิทธิ์ ไทยรัตน์",
        movie_trailer: "https://www.youtube.com/embed/Mg1DlO_o_v8?si=-3RfzS55O3F06dZY",
        movie_poster: "/images/movie02.jpg"
    },
    {
        movie_id: 3,
        movie_name: "เดอะ สโตน พระแท้ คนเก๊",
        movie_category: "อาชญากรรม , ชีวิต",
        movie_duration: "125 นาที",
        movie_description: "เมื่อ “เอก”ต้องการเงินไปรักษาพ่อที่ป่วยหนัก เขาเอาพระเครื่องของพ่อไป ประเมินราคากับเซียนพระชื่อดัง “เซ้งพาราไดซ์” เอกได้เจอกับ “เซียนหมวย” เซียนพระสุดฮ็อตที่เข้ามาแนะนำให้ส่งพระเข้าประกวด แต่กลายเป็นว่าพระที่อยู่ในมือของเอก คือ “พระสมเด็จ” ของแท้ชื่อดังในตำนานที่หายไปจากวงการกว่า 30 ปี ที่อาจมีราคาสูงถึงหลักร้อยล้าน และเป็นที่จับจ้องของคนเล่นพระทั้งวงการรวมถึง “พ่อสุนทร” เซียนพระผู้ทรงอิทธิพล พ่วงมาด้วยบุคคลปริศนาอย่าง “วิคเตอร์” เกิดเป็นการพลิกชีวิตของคนที่ไม่เคยสนใจพระเครื่อง เข้าสู่เดิมพันอันตรายของเหล่าเซียนที่พร้อมใช้ทุกเล่ห์เหลี่ยมกลโกงแย่งชิง “พระแท้” มาครอบครอง",
        movie_actors: "จินเจษฎ์ วรรธนะสิน, กรณิศ เล้าสุบินประเสริฐ, อิชณน์กร พึ่งเกียรติ, รัศมีจุลจักร จักรพงษ์, นพพล โกมารชุน",
        movies_director: "วุฒิพงษ์ สุขะนินทร์, อารักษ์ อมรศุภศิริ",
        movie_trailer: "https://www.youtube.com/embed/yX70mQgOxSQ?si=w9O9G7jI6j7mFPN3",
        movie_poster: "/images/movie03.jpg"
    },
    {
        movie_id: 4,
        movie_name: "ซองแดงแต่งผี",
        movie_category: "ตลก",
        movie_duration: "107 นาที",
        movie_description: "เรื่องราวการแต่งงานสุดพิลึกพิลั่นระหว่างคนกับผี ที่ป่วนที่สุดในสองโลก! เมื่อ ‘เม่น’ (บิวกิ้น พุฒิพงศ์) โจรกระจอกที่ผันตัวมาเป็นสายตำรวจ เผลอไปหยิบซองแดงปริศนา และพบว่ามันคือพิธีกรรมความเชื่อเก่าแก่ที่ทำให้เขาต้องแต่งงานกับศพ ไม่เช่นนั้นเขาจะซวยไปตลอดชีวิต แต่ที่ทำให้ชายแท้อย่างเม่นต้องเหวอสุดขีดก็คือ ศพที่เขาต้องแต่งด้วยดันเป็นผู้ชายด้วยกัน! และนั่นทำให้เขาได้เจอกับ ‘ตี่ตี๋’ (พีพี กฤษฏ์) วิญญาณเกย์หนุ่มสุดคิวต์ ที่ยังไม่ยอมไปเกิดเพราะยังมีเรื่องค้างคาใจ เม่นต้องช่วยตามสืบอุบัติเหตุที่คร่าชีวิตตี่ตี๋ โดยหวังจะทำให้ตี่ตี๋ไปสู่สุคติและออกไปจากชีวิตเขาสักที ยิ่งไปกว่านั้น เบาะแสทั้งหมดที่เม่นพบกลับกลายเป็นว่านี่อาจไม่ใช่อุบัติเหตุธรรมดา แต่มันโยงใยไปสู่แก๊งค้ายาที่เขา และ ‘เจ๊ก๊อย’ (ก้อย อรัชพร) ตำรวจสาวรุ่นพี่ที่เม่นแอบชอบกำลังตามสืบอยู่ด้วย งานนี้ เม่นจึงหวังจะปิดคดีเพื่อที่เขาจะได้ทั้งหน้าที่การงาน ความรัก และช่วยให้ตี่ตี๋ไปเกิดเสียที",
        movie_actors: "บิวกิ้น พุฒิพงศ์ อัสสรัตนกุล, พีพี กฤษฏ์ อำนวยเดชกร, ก้อย อรัชพร โภคินภากร, ปิยะมาศ โมนยะกุล, จตุรงค์ พลบูรณ์, รัศมีแข ฟ้าเกื้อล้น, เอ็ดดี้ จรรยหาญ, ธีรวัฒน์ อนุวัตรอุดม, แอนนา ชวนชื่น, ธนวัฒน์ เชี่ยวอร่าม",
        movies_director: "ชยนพ บุญประกอบ",
        movie_trailer: "https://www.youtube.com/embed/zmsN3WVXqrU?si=VobEj9h-LrUeSGNf",
        movie_poster: "/images/movie04.jpg"
    },
    {
        movie_id: 5,
        movie_name: "ไมน์คราฟต์ มูฟวี่",
        movie_category: "แอ็คชัน , ผจญภัย , แฟนตาซี",
        movie_duration: "101 นาที",
        movie_description: "คนแปลกหน้า 4 คนพบว่าตัวเองปัญหาธรรมดา ๆ ที่กำลังเผชิญหน้าอยู่กลับกลายมาเป็นเรื่องใหญ่ เมื่อพวกเขาถูกดึงผ่านประตูมิติอันลึกลับไปยังโลกโอเวอร์เวิลด์ ดินแดนสุดมหัศจรรย์ที่เต็มไปด้วยจินตนาการและรูปลักษณ์เป็นเหลี่ยมมุม และเพื่อที่จะเดินทางกลับบ้าน พวกเขาต้องเรียนรู้ที่จะเชี่ยวชาญการใช้ชีวิตในโลกใบนี้ พร้อมกับออกผจญภัยในภารกิจแสนมหัศจรรย์ โดยมี คราฟเตอร์ ผู้เชี่ยวชาญและคาดไม่ถึงอย่าง สตีฟ คอยช่วยเหลือ",
        movie_actors: "เจสัน โมโมอา, เคท แม็คคินน่อน, แจ็ก แบล็ก, เจนนิเฟอร์ คูลิด, เอ็มมา ไมเออรส์, แดเนี่ยลล์ บรูคส์, เจเมน เคลเมนต์, เซบาสเตียน ยูจีน ฮานเซน, วาล์คีเร",
        movies_director: "จาเร็ด เฮสส์",
        movie_trailer: "https://www.youtube.com/embed/McdOLLqT6oQ?si=1tGTCco-1ckAoJm9",
        movie_poster: "/images/movie05.jpg"
    },
    {
        movie_id: 6,
        movie_name: "Sikandar",
        movie_category: "แอ็คชัน , ชีวิต , ระทึกขวัญ",
        movie_duration: "140 นาที",
        movie_description: "Sikandar เป็นเรื่องราวการเดินทางของชายคนหนึ่งที่ฝ่าฟันทุกอุปสรรคที่ถาโถมเข้าใส่ชีวิตของเขา เพียงเพื่อที่จะบรรเทาทุกข์ให้กับคนที่ไร้หนทาง และคนที่ต้องการความช่วยเหลือจากเขา เป็นเรื่องราวของความเปลี่ยนแปลงของเขา จากชายที่เมินเฉยต่อโลก สู่ชายที่ไร้ซึ่งความเห็นแก่ตัว โดยภรรยาของเขาเป็นแรงบันดาลใจให้เขาลุกขึ้นมาเป็นแสงสว่างแห่งความหวังให้แก่ผู้ที่ติดอยู่ในความมืด",
        movie_actors: "ซาลมาน ข่าน, สัตยาราช, คาจาล แอกกอร์วาล, รัชมิกา มันดันนา, ชาร์แมน โจชี่, สุนีล เศฏฏี",
        movies_director: "เอ.อาร์. มูรูกาดอสส์",
        movie_trailer: "https://www.youtube.com/embed/BAk5ZCoTWY8?si=aIH9CD7UtP24kl30",
        movie_poster: "/images/movie06.jpeg"
    },
    {
        movie_id: 7,
        movie_name: "ล็อก ล่อมาตาย",
        movie_category: "ระทึกขวัญ",
        movie_duration: "95 นาที",
        movie_description: "เมื่อ เอ็ดดี้ งัดเข้าไปในรถเอสยูวีสุดหรูคันหนึ่ง เขาก็ได้ก้าวเข้าไปสู่กับดักแสนอันตรายของ วิลเลี่ยม ชายผู้ตั้งตนขึ้นมาเป็นศาลเตี้ยและแสดงความยุติธรรมที่บิดเบี้ยวในฉบับของเขาเอง และเมื่อการพยายามหนีเป็นเรื่องที่เป็นไปไม่ได้ เอ็ดดี้ ต้องต่อสู้เพื่อเอาชีวิตรอดในรถคนนี้ ที่ซึ่งการหลบหนีเป็นเพียงภาพลวงตา, การเอาชีวิตรอดเปรียบเสมือนฝันร้าย และความยุติธรรมเป็นเรื่องเดือดทะลุปรอท",
        movie_actors: "แอนโทนี่ ฮอปกินส์, บิล ซาร์สการ์ด, แอชลีย์ คาร์ทไรต์",
        movies_director: "เดวิด ยาโรเวสกี้",
        movie_trailer: "https://www.youtube.com/embed/zLIlLxKct-8?si=Q--cdg-_ymTU_QKK",
        movie_poster: "/images/movie07.jpg"
    },
    {
        movie_id: 8,
        movie_name: "SEVENTEEN RIGHT HERE WORLD TOUR IN CINEMAS",
        movie_category: "เพลง",
        movie_duration: "130 นาที",
        movie_description: "SEVENTEEN RIGHT HERE! สัมผัสประสบการณ์แห่งช่วงเวลาที่น่าจดจำไม่รู้ลืมไปกับ SEVENTEEN [RIGHT HERE] WORLD TOUR บนหน้าจอขนาดใหญ่ ร่วมชมคอนเสิร์ตเปิดทัวร์ที่ทรงพลัง บันทึกภาพการแสดงสดจาก Goyang ไปด้วยกัน! เปิดโชว์ด้วยเพลง 'Fear' ในเวอร์ชันสุดพิเศษสำหรับคอนเสิร์ตและการแสดงสดที่หาดูที่ไหนไม่ได้อีกแล้วนอกจากในคอนเสิร์ตนี้เท่านั้นของ 'LOVE, MONEY, FAME (feat. DJ Khaled)' และ 'Ash' เพลงทั้งหมดที่แสดงในคอนเสิร์ตนี้พร้อมแล้วที่จะฉายในโรงภาพยนตร์แบบไม่ตัดทอน! เตรียมตัวสนุกไปกับความมีชีวิตชีวาของ SEVENTEEN ที่ขนมาทั้งยูนิตฮิปฮอป, ยูนิตเพอร์ฟอร์แมนซ์ และยูนิตโวคอล ครบจัดเต็มทั้งสามยูนิต ระเบิดความมันส์ต่อเนื่องกับทุกเพลงฮิตของวงแบบเพลย์ลิสต์ A to Z ของ SEVENTEEN!",
        movie_actors: "เอส.คุปส์, จองฮัน, โจชัว, จุน, โฮชิ, วอนอู, อูจี, ดิเอท, มินกยู, ดีเค, ซึงกวาน, เวอร์นอน, ดีโน",
        movies_director: "โอยุนดง",
        movie_trailer: "https://www.youtube.com/embed/sUQSewD1pUY?si=cGuydrtYoGQEsOwu",
        movie_poster: "/images/movie08.jpg"
    }
    ]);

  await db.collection('showing_movies').insertMany([
    {
        movie_id: 1,
        dates: [
            {
                date: "2025-03-29",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN",
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "17:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }                    
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:10",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "17:15",
                                        seats: generateSeats(6, 10),
                                    }                             
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "9.45",
                                        seats: generateSeats(6, 10),
                                    },                         
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "15:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-30",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18.00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10.00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10.10",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "17.45",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "14.00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "18:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-31",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "15:05",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10.15",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18.15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            } ,
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "9.50",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "18:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-01",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:05",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:05",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:20",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-02",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:015",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "9.45",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-03",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-04",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:20",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:25",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18.25",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        movie_id: 2,
        dates: [
            {
                date: "2025-03-29",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH",
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH",
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-30",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-31",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-01",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-02",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:030",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-03",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-04",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "16:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
     {
        movie_id: 3,
        dates: [
            {
                date: "2025-03-29",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH",
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-30",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-31",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-01",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-02",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:45",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16.30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19.30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-03",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "15:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:45",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-04",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:20",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            ,
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:45",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        movie_id: 4,
        dates: [
            {
                date: "2025-03-29",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH",
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-30",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:20",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-31",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:20",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-01",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-02",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:10",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:45",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-03",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-04",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            ,
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            ,
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:20",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },,
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        movie_id: 5,
        dates: [
            {
                date: "2025-03-29",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN",
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:45",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-30",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "11:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "17:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-31",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "14:10",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-01",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "10:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-02",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        movie_id: 6,
        dates: [
            {
                date: "2025-03-29",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"EN",
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:10",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "15:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-30",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "14:10",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:10",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:10",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-31",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "19:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "14:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-01",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-02",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-03",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        movie_id: 7,
        dates: [
            {
                date: "2025-03-29",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 7",
                                voice:"EN",
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "18:10",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 2",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20.30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-30",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "18:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"TH", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "19:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-31",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 7",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "11:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "18:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-01",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 3",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "16:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-02",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 5",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "11:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 6",
                                voice:"EN", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
{
        movie_id: 8,
        dates: [
            {
                date: "2025-03-29",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 7",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "19:10",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 9",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "14:15",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 3",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "20:45",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-30",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"KR",
                                times: [
                                    {
                                        time: "15:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "15:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-03-31",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 7",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 5",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-01",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 6",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 7",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 1",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 2",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 5",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "13:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                date: "2025-04-02",
                cinemas: [
                    {
                        cinema: "ไมเนอร์ รังสิต",
                        price: 180,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 7",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "19:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "14:00",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cinema: "ไมเนอร์ ท่าพระจันทร์",
                        price: 200,
                        theaterDetails: [
                            {   
                                theaterName: "Theater 4",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "17:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            },
                            {   
                                theaterName: "Theater 8",
                                voice:"KR", 
                                times: [
                                    {
                                        time: "10:30",
                                        seats: generateSeats(6, 10),
                                    },
                                    {
                                        time: "20:30",
                                        seats: generateSeats(6, 10),
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

  ]);

  await db.collection('users').insertOne({
    user_id: 1,
    user_firstName: "name",
    user_lastName: "lastname",
    email: "test@mail.com",
    password: "password"
  });

  await db.collection('bookings').insertOne({
    booking_id: 1,
    user_id: 1,
    showing_movie_id: 1,
    cinema_name: "ไมเนอร์ รังสิต",
    theater_name: "Theater 7",
    time: "11:00",
    seat_number: [
        "D5"
    ],
    type_payment: "PromptPay",
    total_price: 150,
    coupon_id: 4
  });

  await db.collection('coupons').insertMany([
    {
        coupon_id: 1,
        coupon_name: "ตั๋วหนังหรรษา",
        discount: 80,
        coupon_description: "ชวนเพื่อนซี้ของคุณมาสัมผัสประสบการณ์ความบันเทิงสุดหรรษา! รับส่วนลดพิเศษทันที 80 บาท สำหรับการซื้อตั๋วหนังทุกเรื่อง ทุกรอบฉาย ให้คุณและเพื่อนได้เต็มอิ่มกับภาพยนตร์ที่คุณรอคอย ในราคาที่สบายกระเป๋ากว่าเดิม!",
    },
    {
        coupon_id: 2,
        coupon_name: "Movie Time สบายกระเป๋า",
        discount: 50,
        coupon_description: "ได้เวลาพักผ่อนหย่อนใจกับภาพยนตร์เรื่องโปรดแล้ว! เพียงใช้คูปองนี้ รับส่วนลดทันที 50 บาท เมื่อซื้อตั๋วหนัง ไม่ว่าจะดูคนเดียว หรือชวนคนรู้ใจมาสนุกด้วยกัน ก็คุ้มค่าเกินใคร ให้ทุก Movie Time ของคุณเป็นช่วงเวลาแห่งความสุขแบบสบายกระเป๋า!",
    },
    {
        coupon_id: 3,
        coupon_name: "สุขสันต์วันดูหนัง",
        discount: 40,
        coupon_description: "เติมเต็มความสุขในวันพิเศษของคุณด้วยคูปองส่วนลดสุดคุ้ม! รับส่วนลดไปเลย 40 บาท สำหรับการซื้อตั๋วหนังเรื่องใดก็ได้ รอบใดก็ได้ ให้คุณได้ดื่มด่ำกับภาพยนตร์คุณภาพ พร้อมสร้างความทรงจำดี ๆ ในวันสุขสันต์ของคุณ!",
    },
    {
        coupon_id: 4,
        coupon_name: "เพื่อนซี้พาดูหนัง",
        discount: 30,
        coupon_description: "แท็กเพื่อนซี้ของคุณแล้วมาดูหนังกัน! ใช้คูปองนี้รับส่วนลด 30 บาท สำหรับการซื้อตั๋วหนัง เพื่อให้คุณและเพื่อนได้สนุกสุดเหวี่ยงไปกับภาพยนตร์ที่คุณชื่นชอบ ในราคาที่ทุกคนยิ้มได้ อย่ารอช้า รีบชวนเพื่อนมาสร้างโมเมนต์ดี ๆ ด้วยกันเลย!",
    },
    {
        coupon_id: 5,
        coupon_name: "สุขสันต์วันดูหนังสุดสัปดาห์",
        discount: 20,
        coupon_description: "เติมเต็มความสุขในวันหยุดสุดสัปดาห์ของคุณด้วยคูปองส่วนลดสุดคุ้ม! รับส่วนลดไปเลย 20 บาท สำหรับการซื้อตั๋วหนังเรื่องใดก็ได้ รอบใดก็ได้ ให้คุณได้ดื่มด่ำกับภาพยนตร์คุณภาพ พร้อมสร้างความทรงจำดี ๆ ในวันพักผ่อนของคุณ!",
    },
  ]);

  await db.collection('coupon_status').insertOne({
    couponStatus_id: 1,
    user_id: 1,
    coupon_id: 1,
    coupon_status: true
  });


  console.log("Seed complete");
  await client.close();
}

function generateSeats(rows, cols) {
    const seats = [];
    const alphabet = "ABCDEF";
    for (let r = 0; r < rows; r++) {
      for (let c = 1; c <= cols; c++) {
        seats.push({
          seatId: `${alphabet[r]}${c}`,
          isBooked: false, // สถานะเริ่มต้นเป็น false (ว่าง)
        });
      }
    }
    return seats;
  }

seed();

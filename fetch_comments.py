import urllib.request
import json
import time

videos = [
  {"ep": 1, "bv": "BV1smTi6aE6J", "aid": 116845558438138, "title": "祖传BUG，屎山论剑｜国模AI选拔赛"},
  {"ep": 2, "bv": "BV1okM86eEwi", "aid": 116878055839344, "title": "LongCat2.0发布：美团龙猫，请直面屎山代码！"},
  {"ep": 3, "bv": "BV1etMJ6NEd4", "aid": 116889011492105, "title": "HY3.0！你终究还是要面对屎山代码的考验！"},
  {"ep": 4, "bv": "BV1KeN76rEJ9", "aid": 116894933721041, "title": "Grok4.5！从火星来的AI！到屎山去改BUG！"},
  {"ep": 5, "bv": "BV1QNKw6uE3L", "aid": 116940114825302, "title": "Kimi-K3｜实战祖传代码｜代表月亮！照亮屎山！"},
  {"ep": 6, "bv": "BV1vrgQ6aEJU", "aid": 116968468256518, "title": "请接受《屎山》的检验｜Qwen3.8Max｜Gemini3.6Flash"},
  {"ep": 7, "bv": "BV1893x6HE7s", "aid": 117008683243189, "title": "屎山论剑｜中美AI！决战屎山之巅！"},
  {"ep": 8, "bv": "BV1fk3X6CEXb", "aid": 117024017618229, "title": "屎山论剑｜DeepSeekV4Flash：下一位！"},
  {"ep": 9, "bv": "BV1HzbX6tEvR", "aid": 117105152236302, "title": "开源AI闭源AI决战屎山之巅｜屎山论剑"},
  {"ep": 10, "bv": "BV1mu4X6cEkD", "aid": 117183434726992, "title": "谁是模型斩杀线，来看屎山大论剑｜屎山论剑"},
  {"ep": 11, "bv": "BV1R2b56uEK7", "aid": 117234588587650, "title": "来屎山之巅，看GPT6和Fable5.1神仙打架｜屎山论剑"},
  {"ep": 12, "bv": "BV1eCYD6QEqS", "aid": 117256667405655, "title": "四家Flash大乱斗，挑战屎山代码｜屎山论剑"}
]

headers = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    "Referer": "https://www.bilibili.com",
    "Accept": "application/json, text/plain, */*"
}

all_comments = []

for v in videos:
    aid = v["aid"]
    ep_num = v["ep"]
    ep_title = v["title"]
    url = f"https://api.bilibili.com/x/v2/reply?type=1&oid={aid}&pn=1&ps=20&sort=2"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            data_body = data.get("data") or {}
            replies = data_body.get("replies") or []
            upper_top = data_body.get("upper", {}).get("top")
            top_list = [upper_top] if upper_top else []
            
            combined = top_list + [r for r in replies if not upper_top or r.get("rpid") != upper_top.get("rpid")]
            print(f"Ep {ep_num}: fetched {len(combined)} comments")
            for c in combined:
                mem = c.get("member", {})
                content = c.get("content", {})
                all_comments.append({
                    "rpid": str(c.get("rpid")),
                    "episode": ep_num,
                    "episodeTitle": ep_title,
                    "bvid": v["bv"],
                    "userName": mem.get("uname"),
                    "userAvatar": mem.get("avatar"),
                    "userLevel": mem.get("level_info", {}).get("current_level", 5),
                    "likeCount": c.get("like", 0),
                    "replyCount": c.get("rcount", 0),
                    "isUpTop": bool(c.get("reply_control", {}).get("is_up_top") or (upper_top and c.get("rpid") == upper_top.get("rpid"))),
                    "isUpLike": bool(c.get("reply_control", {}).get("up_like")),
                    "timeDesc": c.get("reply_control", {}).get("time_desc", ""),
                    "message": content.get("message", "")
                })
        time.sleep(0.2)
    except Exception as e:
        print(f"Error on ep {ep_num}: {e}")

print(f"Total fetched: {len(all_comments)} real Bilibili comments!")
with open("src/data/realBilibiliComments.json", "w", encoding="utf-8") as f:
    json.dump(all_comments, f, ensure_ascii=False, indent=2)

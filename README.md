# My工工四 (くんくんしー)

簡単な工工四を書く為のツールです。

Javascriptで簡単なjQueryにて開発しております。

## 工工四とは

三線の楽譜です。

## 使い方

一般のキーボード（QWERTY）では

### 【男弦】
```
Z　→　合
X　→　乙
C　→　老
V　→　下老
```

### 【中弦】
```
A　→　四
S　→　上
D　→　中
F　→　尺
G　→　下尺
```

### 【女弦】
```
Q　→　工
W　→　五
E　→　六
R　→　七
T　→　八
Y　→　九
```

### その他のホットキー
```
空白        →　〇（休み）

後退        →　一文字を削除
Ctrl + 後退 →　一文章を削除

Delete          →　カーソルの次一文字を削除
Ctrl + Delete   →　カーソルの次の文章をを削除

Shift + 一般ノート  →　♯
Alt + 一般ノート    →　♭
```

### ＰＣに保存

曲名を付けた上で、楽譜をＰＣに保存する事ができます。
なお、ファイルは「`.kks`」(`ContentType: application/kunkunsi-note`)になります。

### ＰＣから読込

保存したファイル（.kks）をウェブで開けます。

---

## データの説明

### フォーマット

一つの文字が８ビットのデータに変換します。勝手に「`工工四Byte（くんくんしーバイト）`」と呼ばせていただきます。

### 工工四Byteの説明

#### フラット・シャープビット・小文字

上の３ビットはフラット・シャープ・小文字を表します。

```
000 - 普通
01x - フラット (♭)
10x - シャープ (♯)
xx1 - 小文字
```

#### 弦ビット

中の２ビットは三線の弦を表します。

```
01 - 男弦
10 - 中弦
11 - 女弦
```

#### 指ビット

下の３ビットは指の位置を表します。価値が大きければ大きいほど、胴に近づくと表します。

```
000 - 合四工（開放）
001 - 乙上五
010 - 老中六
..., 011, 100, 101, 110, 111
```

### 休み

```
00000000
```

工工四によって一泊休みは丸「〇」記号で表します。

## 例

```
00001010（老）
 000 - フラット・シャープ無し
  01 - 男弦
 010 - 指の位置が二番目
```

```
10010011（尺♯）
 100 - シャープ
  10 - 中弦
 011 - 指の位置が三番目
```
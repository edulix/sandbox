import { arithm, crypto, util, eio } from "./vjsc-1.1.1.js"
import "util"
//import { inspect } from "util"

console.log("****************** test2.js ******************")

let randomSource = new crypto.RandomDevice()
let statDist = 50

// EG schnorr

const base = "0"
const pkString = "771632082893826147986001739015100390596891993741029383383193370304233499104250823855538643959571858723710269154759912753019096784501541341466089847723525936179275117294813910832130755064522276413408403471023984963242166938153514069926404934758661658257528718300677232438335809800481911356354734662950853501660000145640709855645391964120329649409161971123640130297755334097586116457161951378680819803181090266716165659095625287968651973742648699607244681163394174768818366596717488745410469972968169184799110618064506572240944976913745904205825731589635359287435860361627388201591772448956679969276015870287328631781151622921435584522469318802495374119157619783895250141260352043112231280456995705163091740813958450829394158007607091681144969124391351245862532242645135756046695113726745157026797494167586072376028245411007188932002163390051177405177929403986037713624631361941335904237672202322945639576289260377190069492485150920852597695986856461721309575473539085539067305946902967068996157306200623126274091131447903492233185316446352047430904649146900953667581866468414198230062952987476093392028184883548098669597063164623530920554398029085991176479347182588985435009542370035985705909513848711171297430669367333956054020665531"
const commitment = "855524102737723962237521812428163516510758472215122430748883967045793404610670486660838746338593516836807175220844862271956172237916825895104770694040470795774627892720188315911177975216605032583616572783566844990156734118631697744329747202531342126086084364807272804415263971824054437878227019291277181499890793582283936475804384924261570782589882446282601612685509819965549534661817037431870617808569006275303478418922921787433759189856537414790014248459920479769004944719601839710324503054028187366186002318450695442314555444834379123935239800522800849410674588735424404824238552328174159724689682911247357888577624031929436504729308249946315102980063945073742197389120598519998494024336364528292743100665497343942729876074620804185656867029739260884468147973912341294436973913754131277581281335396195732863443835202905358294591972398198785929932625800523526640842611226197640169414626291132546476245734896911256610173308930796713724251004101954262275095408602914563591770524170472874093884505606225402487328043308814573928647456345814437457966421969074184924876850092801468670935809698256567730363465668898628935636773457349835915405025536133488899137310929237406687860463524650411144922955938271886004161062616369682884025360583"
const challenge = "69140791929353205316569033988073687580493884653616429803092163035389876018302"
const response = "56419786273425368381000826435612342053915367930143492376714917629480845325942"

const baseBigInt = BigInt(base)
const pkBigInt = BigInt(pkString)
const commitmentBigInt = BigInt(commitment)
const challengeBigInt = BigInt(challenge)
const responseBigInt = BigInt(response)

const bb = util.hexToByteArray(baseBigInt.toString(16))
const pkb = util.hexToByteArray(pkBigInt.toString(16))
const cb = util.hexToByteArray(commitmentBigInt.toString(16))
const challengeb = util.hexToByteArray(challengeBigInt.toString(16))
const rb = util.hexToByteArray(responseBigInt.toString(16))

var concat = new Uint8Array(bb.length + pkb.length + cb.length)
concat.set(bb)
concat.set(pkb, bb.length)
concat.set(cb, bb.length + pkb.length)

const p_param = "1044388881413152506691752710716624382579964249047383780384233483283953907971557456848826811934997558340890106714439262837987573438185793607263236087851365277945956976543709998340361590134383718314428070011855946226376318839397712745672334684344586617496807908705803704071284048740118609114467977783598029006686938976881787785946905630190260940599579453432823469303026696443059025015972399867714215541693835559885291486318237914434496734087811872639496475100189041349008417061675093668333850551032972088269550769983616369411933015213796825837188091833656751221318492846368125550225998300412344784862595674492194617023806505913245610825731835380087608622102834270197698202313169017678006675195485079921636419370285375124784014907159135459982790513399611551794271106831134090584272884279791554849782954323534517065223269061394905987693002122963395687782878948440616007412945674919823050571642377154816321380631045902916136926708342856440730447899971901781465763473223850267253059899795996090799469201774624817718449867455659250178329070473119433165550807568221846571746373296884912819520317457002440926616910874148385078411929804522981857338977648103126085895011648256092372242446818525911665961045150145231572613786749168750228798758833" 
const g_param =  "633902738424928856783669360417409461352724866437176267937054971987929518113968311572018846775440350331394872441420725806863767569147521628581387346133794141162759618915434384470928048515684966754389921404728037087585951549298706749491681316440418023335644037157549668734734747234193236480208211700649047792505290394509276323498712019417085994608675098219625068478389802372911974790447602798848267203035795626948013815751746314708193865142515067213438779931341448784231764283922931059803394647357407601820746377200693540251395985610151207325893305136968984729108604308872514815118245429658506703427331797397729626291989388778680839647127066755635696870257359738766274560298982571341199340105150191282665463341766016615086716556537263439886148093374656225718217401337340651580107886515914073965138178083420939392671278560530056147682312589783964279302141118430614587577025403023718516789910534505871873011436491653121601912717709648600938567837813521742472036386528727473354399846339619270536399678071529700504925046483796750809603796528358402843506478188359404393987635666119244256746743854126114174948922250715011664059118382465474343042744744366613138372697678748514832068141362891787033831013749278870696574778057534613154041019988"

const p_value = new arithm.LargeInteger(BigInt(p_param).toString(16)) 

const p_group: arithm.ModPGroup = new arithm.ModPGroup(
    p_value,
    p_value.sub(arithm.LargeInteger.ONE).div(arithm.LargeInteger.ONE.add(arithm.LargeInteger.ONE)),
    new arithm.LargeInteger(BigInt(g_param).toString(16)),
    1
)

const label = randomSource.getBytes(10)
const eh = new arithm.ExpHom(p_group.pRing, p_group.getg())

class X extends crypto.SchnorrProof {
    constructor(homomorphism: arithm.ExpHom) {
        super(homomorphism)
    }

    challenge(first: eio.ByteTree, second: crypto.HashFunction): arithm.PRingElement {
        // console.log("challenge receives bt")
        // console.log(inspect(first, false, 3, true))
        // console.log("================")
        const digest = second.hash(first.toByteArrayRaw())
        // console.log("challenge input byte array")
        // console.log(first.toByteArrayRaw().slice(1024, 1124))
        // console.log(first.toByteArrayRaw().length)
        // console.log("================")
        console.log("digest")
        console.log(BigInt("0x" + util.byteArrayToHex(digest)))
        // console.log("================")
        return this.homomorphism.domain.getPField().toElement(digest)
    }

    instanceToByteTree(instance: arithm.PGroupElement): eio.ByteTree {
        // console.log("returning instance bt")
        // console.log(inspect(instance.toByteTreeNoZero(), false, 3, true))
        // console.log("================")
        return instance.toByteTreeNoZero()
    }

    byteTreeToCommitment(byteTree: eio.ByteTree) {
        return this.homomorphism.range.toElementAlt(byteTree)
    }

    /*byteTreeToReply(byteTree: eio.ByteTree) {
        return this.homomorphism.domain.toElement(byteTree.toByteArrayRaw())
    }*/

    verifyEG(label: Uint8Array, instance: eio.ByteTree, 
        commitment: Uint8Array | eio.ByteTree, 
        challenge: Uint8Array, response: Uint8Array): boolean {
        
        const instanceElement = this.homomorphism.range.toElementAlt(instance)
        
        const cbtt = eio.ByteTree.asByteTree(commitment)
        const rbtt = eio.ByteTree.asByteTree(response)
        
        const proof = new eio.ByteTree([cbtt, rbtt])
        
        // console.log("setting proof as")
        // console.log(inspect(proof, false, 3, true))
        // console.log("================")
        
        const proofb = proof.toByteArray()
        
        return this.verify(label, instanceElement, crypto.sha256, proofb)
    }
}

let spa = new X(eh)
// instance = p_group.encode(pkb, 0, pkb.length)

// instance = p_group.toElement(eio.ByteTree.asByteTree(pkb2))
const instance = p_group.toElement(pkb)

// console.log(pkBigInt.toString(16))
// console.log(util.byteArrayToHex(instance.toByteTree().toByteArray()))

const lbt = eio.ByteTree.asByteTree(bb)
const ibt = spa.instanceToByteTree(instance)
const cbt = eio.ByteTree.asByteTree(cb)
const rbt = eio.ByteTree.asByteTree(rb)

const prf = new eio.ByteTree([cbt, rbt])

const bt = new eio.ByteTree([lbt, ibt, cbt])
const ch = spa.challenge(bt, crypto.sha256)
console.log(ch.equals(p_group.pRing.toElement(challengeb)))

var ok = spa.verify(bb, instance, crypto.sha256, prf.toByteArray())
console.log(ok)

ok = spa.verifyEG(bb, eio.ByteTree.asByteTree(pkb), cb, challengeb, rb)
console.log(ok)

// EG Chaum-Pedersen

// prove that g^x = public key and alpha^x = partial decryption (Share in schema) and knowledge of x

console.log("----");
const c1 = "407758478760839227773765952953267283687224845688335528164414421980959130228077215248572864369629524923169279822189304292027106886841890647244276880610885379437538459664982134397148671236763424389026575314723252010640618403107316477850699497133889142283778169132948142882776739911242086429672103523436194427482006369916235241052525820355192298066433977309702212926117876277961466741552842637819702252166372171813452116772040930781667024445436683859301289615357111090078149537959356877814958783058152100266241024381865780549244691574223371585769382930947918525139671921297106451099455709141326488705112087715863897145557823043173348337365686717354563701758885185257464844323743504137627803382900079074473208686516899837431912110356010252684397152108871913313726564011527529882226064527338383163712134504580094575153276649896999301234387017322069521019922508097268564640771571084072781069434674362469369165853577620125615692497923200107523965345529326748637085852019520278628574168615146407403564639639887573171383031729561063481414241353983370889889233097445457052179609858016300597038620011804229354194340941897189643095057035568379684354966351528783910770000381631653392410127019296611532067709037712333821421900575561648900921931869"
const c1b = util.hexToByteArray(BigInt(c1).toString(16))
// the generator for first side is the standard generator
const g = p_group.getg()
// the generator for second side is the alpha of the ciphertext
const h = p_group.toElement(c1b)
// the public key for the first trustee
const A = "1007333874185751980905216605723937615988127481323013941486964442788578993777307181436003011409675027992860496095293492919580032178608599503326746291990466168606010949664637258693730182757293220632263070383693354776175704127227658313439533540079724109087430633777388121992231518761158010515492778045076955418593375972425716679724613220401587560798086645583951952671095528891929772498360201635269129475376197690275822356343773254872354988525806451942550671631139843784571790216634478964016522459384969027987263481848058807406742646865088667119820028021977596993197894838919544593368806250653366479422007416765261636351681949812669957626406431815349855545283352035329187949356084456490609185298611497843717230449644669938221981255460584186509232607885535035599229908898698805577322256975048639628015330145072508346216584215954682561620081856644748005426457036398393806688157065547972072023043497560605554313501002780290184874757716107798738381856684846436220257998057199929625850522847021520548174288996289037355448693398647623860297451094932182692231270139922241537276673421240908379706032917071152875625834778152099422802876681713612908919690193243802496754551323834067259893249102984999393765150293731328428812480620305379552873636218"
// the partial decryption share
const B = "109247677203220021688571961627785626040530757938668773351291040933519848682101022375176323121081551222548912793732857610359520330361659222584907898330173362516690874718413114280955205753921221188433727287101104543667415758307107202097683918954545333903993751746605076327883848652043299563848601571727160102528270040519973034052177875618419272572518656490157358926060046492142939893154387244416567632419031035666425696942255131318735228702097941320456388674601147439411008518898606879692193578545827657622848261292943666674405034294946841452241010198411336548382374474064197329991868499874590987927851736030156262344597733001071441663183116710622786859417919535279694812654535283672416414671657967135725963672265758204304286379190448656467222130246412522653531639221116509622386102381150972351952583122591099994520364804082106308393344412079319986632881792678323999407128557570489310137225538902969427992150914054150981853840570160893149683914159467281139831315215496382772045964725672492040506918389010980869045715023555979762595200796691890593013496579994264494391586794689989787069629762770017100584262493359581936705337118130558896846986167538628901838274152461033006863724046070117585826639461379458619963172754641958850552273682"
const cpCommitment = {
    c1: "747273137587795004647524548916220211516273750938191295338051381845746744555631893514458628463311135874193862941452907000913560367729940790138828683779939005992923009129795626294994931839278931546161275635226629356282581410504838115086943293645672886855104421195699065107346239623385545283901504805961190562637706690216612254388475969308877835186667186044382925565237647338139360067120885310015840230789753431015434022777139361792196492981265562136126895274269363736502445071863442249932867936904616359550048654046997105023420348963811948651329056312956567125492159740164586776689440894827764112711156322166061177414291236320128049082077894886564573734937392914335614175088914832268685899208289336266372200596200093699020540279580957032973024077104857296798685274564183217636681005069769544415452392682964755120417189466627574929925790479081861475446169003938592740365504869406107466588355889583808771411103137937092299925918176981623590817657851682543722124075722932012013217789853395959565567556256131861180832811124285977649465628528376799442791773016306829464458127851075506188520247534803517608957704523873746138562726546377929697129751546391023924720035868941986271581155895608994122600987167771732592406761448143306283165406228",
    c2: "247990764780601093231732248663680538015257238576318415891796143973669743192510032939899355310190455957966258957888231346597754697794984758176213533981995963471605589269542887826077807647491615672674664024864921089657968693585817702726087204566175805768668525458699812001039861638339376006121220590081444372242417612739227812055048381048917600605466261988171920579534411629011504212928650552629090307593393946782719664343510729065801305355523008351489967674874488089284002601729576425800010103885282836536374299184604560387650649695318494710483679946570471125278979327464156040730123852663084263919368441187911686639940117830726437121639033884861821888671949066273941704364258857905932877411287184901857141291956472509227931560698060718221235629810325985894303439857892661287138377571793560366074593092513998401429360223300349151431080372690856379674684364504251327795712627839093142058378003186990030006429675118462227895363017595963946924262809929226532726487755030065331993239592780435156674016069611208057906089582257131820199560866270051730403418102152862363335463552996223767273598090873537009080355853149880999200950457073185651195763209420672916038995222257460575378221633800932660144603061895020093985881900642695434745078494"
}
const cpChallenge = "53581038711681048354188803299498974752606526760850403385189030371359049007197"
const cpResponse = "43829089432952587846720333602806603561301384020411673390993073397653143385180"

const ppGroup = new arithm.PPGroup([p_group, p_group])
const pair = ppGroup.prod([g, h])

const eh2 = new arithm.ExpHom(p_group.pRing, pair)
const spc = new X(eh2)

const Ab = util.hexToByteArray(BigInt(A).toString(16))
const Bb = util.hexToByteArray(BigInt(B).toString(16))

const Abt = eio.ByteTree.asByteTree(Ab)
const Bbt = eio.ByteTree.asByteTree(Bb)

const instancePair = new eio.ByteTree([Abt, Bbt])

const comm1b = util.hexToByteArray(BigInt(cpCommitment.c1).toString(16))
const comm2b = util.hexToByteArray(BigInt(cpCommitment.c2).toString(16))

const comm1bt = eio.ByteTree.asByteTree(comm1b)
const comm2bt = eio.ByteTree.asByteTree(comm2b)

const commitmentPair = new eio.ByteTree([comm1bt, comm2bt])
// console.log("commitmentPair bt")
// console.log(inspect(commitmentPair, false, 3, true))
// console.log("================")

const cpCb = util.hexToByteArray(BigInt(cpChallenge).toString(16))
const cpRb = util.hexToByteArray(BigInt(cpResponse).toString(16))

// console.log("challenge direct element is")
// console.log(p_group.pRing.toElement(cpCb))
// console.log("================")

// console.log("challenge hex")
// console.log(BigInt(cpChallenge).toString(16))
// console.log("================")
// the extended base hash is also 0, re-use bb
ok = spc.verifyEG(bb, instancePair, commitmentPair, cpCb, cpRb)
console.log(ok)

// ok = sp.verify(label, instance, crypto.sha256, proof)

// console.log(ok)


// ere

// left = g^z
let left = p_group.getg().exp(p_group.pRing.toElement(cpRb))
// right = A^c * y_1
let right = p_group.toElement(comm1b)
    .mul(
        h.exp(p_group.pRing.toElement(cpCb))
    );
console.log(left.equals(right))

// ere
let challenge1_bi = BigInt('53581038711681048354188803299498974752606526760850403385189030371359049007197')
let challenge2_bi = BigInt('71314495010254657836080586464330626627261365260618426367204872973613742433268')
let challenge1 =  p_group.pRing.toElement(util.hexToByteArray(challenge1_bi.toString(16)))
let challenge2 =  p_group.pRing.toElement(util.hexToByteArray(challenge2_bi.toString(16)))
let challenge_sum = challenge1.add(challenge2)
let order_by_def = BigInt(2) ** BigInt(256) - BigInt(189);
let challenge_sum2_bi = (challenge1_bi + challenge2_bi) % (/*order by definition in spec*/BigInt(2) ** BigInt(256) - BigInt(189));
let challenge_sum2 = p_group.pRing.toElement(util.hexToByteArray(challenge_sum2_bi.toString(16)));
let order_bi = BigInt('0x' + p_group.pRing.toString())
let challenge_sum3_bi = (challenge1_bi + challenge2_bi) % order_bi;

console.log("challenge_sum = " + BigInt("0x" + challenge_sum.toString()))
console.log("challenge1_bi + challenge2_bi = " + (challenge1_bi + challenge2_bi));
console.log("challenge_sum2_bi = " + challenge_sum2_bi);
console.log("challenge_sum.equals(challenge_sum2) = " + challenge_sum.equals(challenge_sum2));
console.log("challenge_sum3_bi = " + challenge_sum3_bi);
console.log("order_by_def = " + order_by_def);
console.log("order_bi = " + order_bi);

